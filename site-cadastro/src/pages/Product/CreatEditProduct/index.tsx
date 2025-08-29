import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../service/api";

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

  const [usedCombinations, setUsedCombinations] = useState<
    { colorLineId: string; productCapacityId: string | null }[]
  >([]);

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
      setSelectedCategory(p.idCategory);
      setSelectedLine(p.idProductLine);
      setSelectedColor(p.colorLineId);
      setSelectedCapacity(p.productCapacityId);
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

  // Busca combinações já usadas para bloquear duplicidade
  useEffect(() => {
    if (!selectedCategory || !selectedLine) {
      setUsedCombinations([]);
      return;
    }

    api
      .get("/listProducts", {
        params: { idCategory: selectedCategory, idLine: selectedLine },
      })
      .then((res) => {
        const combos = res.data.products.map((p: any) => ({
          colorLineId: p.colorLineId,
          productCapacityId: p.productCapacityId,
        }));
        setUsedCombinations(combos);
      });
  }, [selectedCategory, selectedLine]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function isColorDisabled(colorId: string) {
    return usedCombinations.some(
      (c) =>
        c.colorLineId === colorId && c.productCapacityId === selectedCapacity
    );
  }

  function isCapacityDisabled(capId: string) {
    return usedCombinations.some(
      (c) => c.productCapacityId === capId && c.colorLineId === selectedColor
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !selectedCategory ||
      !selectedLine ||
      !selectedColor
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("idCategory", selectedCategory);
    formData.append("idProductLine", selectedLine);
    formData.append("colorLineId", selectedColor);
    if (selectedCapacity)
      formData.append("productCapacityId", selectedCapacity);
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
            setSelectedCategory(e.target.value);
            setSelectedLine("");
            setSelectedColor("");
            setSelectedCapacity(null);
          }}
          className="border p-2 rounded-lg"
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLine}
          onChange={(e) => {
            setSelectedLine(e.target.value);
            setSelectedColor("");
            setSelectedCapacity(null);
          }}
          className="border p-2 rounded-lg"
          required
          disabled={!selectedCategory}
        >
          <option value="">Selecione uma linha</option>
          {lines
            .filter(
              (l) => !selectedCategory || l.idCategory === selectedCategory
            )
            .map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
        </select>

        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border p-2 rounded-lg"
          required
          disabled={!selectedCategory || !selectedLine}
        >
          <option value="">Selecione uma cor</option>
          {colors.map((c) => (
            <option key={c.id} value={c.id} disabled={isColorDisabled(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCapacity || ""}
          onChange={(e) => setSelectedCapacity(e.target.value)}
          className="border p-2 rounded-lg"
          disabled={!selectedCategory || !selectedLine}
        >
          <option value="">Selecione uma capacidade</option>
          {capacities.map((c) => (
            <option key={c.id} value={c.id} disabled={isCapacityDisabled(c.id)}>
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
