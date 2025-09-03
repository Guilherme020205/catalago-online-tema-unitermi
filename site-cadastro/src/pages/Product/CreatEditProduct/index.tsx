import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../service/api";

type Combo = {
  productId: string;
  categoryId: string;
  lineId: string;
  colorLineId: string;
  productCapacityId: string | null;
};

const toStr = (v: any) => (v === null || v === undefined ? "" : String(v));

const ProductFormScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [capacities, setCapacities] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Campos adicionais
  const [dimensions, setDimensions] = useState("");
  const [materials, setMaterials] = useState("");
  const [otherFeatures, setOtherFeatures] = useState("");
  const [weight, setWeight] = useState("");
  const [code, setCode] = useState("");
  const [ncm, setNcm] = useState("");
  const [ean, setEan] = useState("");

  // Combinações usadas (sempre apenas da categoria + linha selecionadas)
  const [usedCombinations, setUsedCombinations] = useState<Combo[]>([]);

  // Carrega listas
  useEffect(() => {
    api.get("/listCategory").then((res) => setCategories(res.data.Categorys));
    api.get("/listProductLine").then((res) => setLines(res.data.productLines));
    api.get("/listColorLine").then((res) => setColors(res.data.colorLines));
    api
      .get("/listProductCapacity")
      .then((res) => setCapacities(res.data.productCapacitys));
  }, []);

  // Carrega produto existente se estiver editando
  useEffect(() => {
    if (!id) return;

    api.get(`/GetProductDetail/${id}`).then((res) => {
      const p = res.data.product;
      setName(p.name);
      setDescription(p.description);
      setSelectedCategory(toStr(p.idCategory));
      setSelectedLine(toStr(p.idProductLine));
      setSelectedColor(toStr(p.colorLineId));
      setSelectedCapacity(p.productCapacityId ? toStr(p.productCapacityId) : null);
      setDimensions(p.Dimensions);
      setMaterials(p.Materials);
      setOtherFeatures(p.OtherFeatures);
      setWeight(p.Weight);
      setCode(p.Code);
      setNcm(p.NCM);
      setEan(p.EAN);
      setImagePreview(p.Image);
    });
  }, [id]);

  // Busca combinações já usadas — com filtro DEFENSIVO no cliente
  useEffect(() => {
    if (!selectedCategory || !selectedLine) {
      setUsedCombinations([]);
      return;
    }

    api
      .get("/listProducts", {
        params: {
          idCategory: selectedCategory,
          idLine: selectedLine,
        },
      })
      .then((res) => {
        const products = Array.isArray(res.data?.products)
          ? res.data.products
          : [];

        // Normaliza e filtra NO CLIENTE por categoria + linha (caso o backend ignore os params)
        const filtered = products
          .map((p: any) => ({
            productId: toStr(p.id),
            categoryId: toStr(p.idCategory ?? p.categoryId),
            lineId: toStr(p.idProductLine ?? p.productLineId),
            colorLineId: toStr(p.colorLineId),
            productCapacityId:
              p.productCapacityId !== null && p.productCapacityId !== undefined
                ? toStr(p.productCapacityId)
                : null,
          }))
          .filter(
            (x: Combo) =>
              x.categoryId === toStr(selectedCategory) &&
              x.lineId === toStr(selectedLine)
          )
          // quando editando, não deve bloquear a própria combinação do produto sendo editado
          .filter((x: Combo) => !id || x.productId !== toStr(id));

        setUsedCombinations(filtered);
      });
  }, [selectedCategory, selectedLine, id]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  // Sets de bloqueio calculados com base APENAS nas combinações válidas para a categoria + linha
  const disabledCapacityIds = useMemo(() => {
    if (!selectedColor) return new Set<string>();
    const set = new Set<string>();
    for (const combo of usedCombinations) {
      if (combo.colorLineId === toStr(selectedColor) && combo.productCapacityId) {
        set.add(combo.productCapacityId);
      }
    }
    return set;
  }, [usedCombinations, selectedColor]);

  const disabledColorIds = useMemo(() => {
    if (!selectedCapacity) return new Set<string>();
    const set = new Set<string>();
    for (const combo of usedCombinations) {
      if (combo.productCapacityId === toStr(selectedCapacity)) {
        set.add(combo.colorLineId);
      }
    }
    return set;
  }, [usedCombinations, selectedCapacity]);

  // Se trocar a cor e a capacidade atual ficar inválida, limpa a capacidade
  useEffect(() => {
    if (
      selectedColor &&
      selectedCapacity &&
      disabledCapacityIds.has(toStr(selectedCapacity))
    ) {
      setSelectedCapacity(null);
    }
  }, [selectedColor, selectedCapacity, disabledCapacityIds]);

  // Se trocar a capacidade e a cor atual ficar inválida, limpa a cor
  useEffect(() => {
    if (
      selectedCapacity &&
      selectedColor &&
      disabledColorIds.has(toStr(selectedColor))
    ) {
      setSelectedColor("");
    }
  }, [selectedCapacity, selectedColor, disabledColorIds]);

  // Funções de bloqueio (usam os sets acima)
  function isColorDisabled(colorId: string) {
    if (!selectedCapacity) return false; // só bloqueia cor depois que tiver capacidade escolhida
    return disabledColorIds.has(toStr(colorId));
  }

  function isCapacityDisabled(capId: string) {
    if (!selectedColor) return false; // só bloqueia capacidade depois que tiver cor escolhida
    return disabledCapacityIds.has(toStr(capId));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !description || !selectedCategory || !selectedLine || !selectedColor) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    // Validação final: combinação já existente?
    const willBlock =
      selectedCapacity &&
      usedCombinations.some(
        (c) =>
          c.colorLineId === toStr(selectedColor) &&
          c.productCapacityId === toStr(selectedCapacity)
      );
    if (willBlock) {
      alert("Essa combinação de Cor + Capacidade já existe nessa Categoria + Linha.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("idCategory", selectedCategory);
    formData.append("idProductLine", selectedLine);
    formData.append("colorLineId", selectedColor);
    if (selectedCapacity) formData.append("productCapacityId", selectedCapacity);
    formData.append("Dimensions", dimensions);
    formData.append("Materials", materials);
    formData.append("OtherFeatures", otherFeatures);
    formData.append("Weight", weight);
    formData.append("Code", code);
    formData.append("NCM", ncm);
    formData.append("EAN", ean);
    if (imageFile) formData.append("Image", imageFile);

    try {
      if (id) {
        await api.put(`/editProduct/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/creatProduct", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/product");
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao salvar produto");
    }
  }

  return (
    <div className="flex flex-col m-20">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold select-none">
          {id ? "Editar Produto" : "Criar Produto"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-lg">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-lg"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded-lg"
          rows={3}
          required
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            const v = toStr(e.target.value);
            setSelectedCategory(v);
            setSelectedLine("");
            setSelectedColor("");
            setSelectedCapacity(null);
          }}
          className="border p-2 rounded-lg"
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((c) => (
            <option key={c.id} value={toStr(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLine}
          onChange={(e) => {
            const v = toStr(e.target.value);
            setSelectedLine(v);
            setSelectedColor("");
            setSelectedCapacity(null);
          }}
          className="border p-2 rounded-lg disabled:text-gray-300"
          required
          disabled={!selectedCategory}
        >
          <option value="">Selecione uma linha</option>
          {lines
            .filter((l) => !selectedCategory || toStr(l.idCategory) === toStr(selectedCategory))
            .map((l) => (
              <option key={l.id} value={toStr(l.id)}>
                {l.name}
              </option>
            ))}
        </select>

        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(toStr(e.target.value))}
          className="border p-2 rounded-lg disabled:text-gray-300"
          required
          disabled={!selectedCategory || !selectedLine}
        >
          <option value="">Selecione uma cor</option>
          {colors.map((c) => (
            <option key={c.id} value={toStr(c.id)} disabled={isColorDisabled(toStr(c.id))}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCapacity || ""}
          onChange={(e) => setSelectedCapacity(e.target.value ? toStr(e.target.value) : null)}
          className="border p-2 rounded-lg disabled:text-gray-300"
          disabled={!selectedCategory || !selectedLine}
        >
          <option value="">Selecione uma capacidade</option>
          {capacities.map((c) => (
            <option key={c.id} value={toStr(c.id)} disabled={isCapacityDisabled(toStr(c.id))}>
              {c.capacity}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Dimensões"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Materiais"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Outras características"
          value={otherFeatures}
          onChange={(e) => setOtherFeatures(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Peso"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="NCM"
          value={ncm}
          onChange={(e) => setNcm(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="EAN"
          value={ean}
          onChange={(e) => setEan(e.target.value)}
          className="border p-2 rounded-lg"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded my-2"
          />
        )}
        <input type="file" onChange={handleImageChange} />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          {id ? "Salvar Alterações" : "Criar Produto"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/product")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProductFormScreen;
