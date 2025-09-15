import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../service/api";

const ProductFormScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados dos campos do produto
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

  // Aqui guardamos todas as combinações já usadas (cor + capacidade)
  const [usedCombinations, setUsedCombinations] = useState<
    {
      categoryId: string;
      lineId: string;
      colorLineId: string;
      productCapacityId: string | null;
    }[]
  >([]);

  // Carrega listas básicas
  useEffect(() => {
    api.get("/listCategory").then((res) => setCategories(res.data.Categorys));
    api.get("/listProductLine").then((res) => setLines(res.data.productLines));
    api.get("/listColorLine").then((res) => setColors(res.data.colorLines));
    api
      .get("/listProductCapacity")
      .then((res) => setCapacities(res.data.productCapacitys));
  }, []);

  // Carrega produto existente se for edição
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

  // Busca as combinações já usadas considerando categoria e linha
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
        // Aqui adicionamos categoryId e lineId para comparar corretamente
        const combos = res.data.products.map((p: any) => ({
          categoryId: p.idCategory,
          lineId: p.idProductLine,
          colorLineId: p.colorLineId,
          productCapacityId: p.productCapacityId,
        }));
        setUsedCombinations(combos);
      });
  }, [selectedCategory, selectedLine]);

  // Atualiza imagem quando selecionada
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  // Regras de bloqueio para cor:
  // Bloqueia somente se já existir um produto da mesma categoria + linha
  // com essa cor e a mesma capacidade selecionada.
  function isColorDisabled(colorId: string) {
    return usedCombinations.some(
      (c) =>
        c.categoryId === selectedCategory &&
        c.lineId === selectedLine &&
        c.colorLineId === colorId &&
        c.productCapacityId === selectedCapacity
    );
  }

  // Regras de bloqueio para capacidade:
  // Bloqueia somente se já existir um produto da mesma categoria + linha
  // com essa capacidade e a mesma cor selecionada.
  function isCapacityDisabled(capId: string) {
    return usedCombinations.some(
      (c) =>
        c.categoryId === selectedCategory &&
        c.lineId === selectedLine &&
        c.productCapacityId === capId &&
        c.colorLineId === selectedColor
    );
  }

  // Salvar/editar produto
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
    setLoading(true);
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
    }finally {
      setLoading(false);  
    }

  }

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col m-20">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold select-none">
          {id ? "Editar Produto" : "Criar Produto"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-lg">
        {/* Nome e descrição */}
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

        {/* Categoria */}
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

        {/* Linha */}
        <select
          value={selectedLine}
          onChange={(e) => {
            setSelectedLine(e.target.value);
            setSelectedColor("");
            setSelectedCapacity(null);
          }}
          className="border p-2 rounded-lg disabled:text-gray-300"
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

        {/* Cor */}
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border p-2 rounded-lg disabled:text-gray-300"
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

        {/* Capacidade */}
        <select
          value={selectedCapacity || ""}
          onChange={(e) => setSelectedCapacity(e.target.value)}
          className="border p-2 rounded-lg disabled:text-gray-300"
          disabled={!selectedCategory || !selectedLine}
        >
          <option value="">Selecione uma capacidade</option>
          {capacities.map((c) => (
            <option key={c.id} value={c.id} disabled={isCapacityDisabled(c.id)}>
              {c.capacity}
            </option>
          ))}
        </select>

        {/* Campos adicionais */}
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

        {/* Preview da imagem */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded my-2"
          />
        )}
        <input type="file" onChange={handleImageChange} />

        {/* Botões */}
        <button
          type="submit"
          disabled={loading}
          className={` text-white px-4 py-2 rounded-lg cursor-pointer ${loading ? 'bg-blue-300': 'bg-blue-500'}`}
        >
          {id ? "Salvar Alterações" : "Criar Produto"}
        </button>
        <button
          onClick={() => navigate("/product")}
          disabled={loading} 
          className={` text-white px-4 py-2 rounded-lg cursor-pointer ${loading ? 'bg-gray-300': 'bg-gray-500'}`}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProductFormScreen;
