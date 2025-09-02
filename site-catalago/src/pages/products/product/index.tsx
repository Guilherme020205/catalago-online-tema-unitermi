import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Suggestions from "./components/suggestions";
import { api } from "../../../service/api";
interface Product {
  id: string;
  name: string;
  description: string;
  Image: string;
  ProductCapacity: { id: string; capacity: string };
  ColorLine: { id: string; name: string; code: string };
  Category: { id: string; name: string };
  ProductLine: { id: string; name: string };
  Dimensions: string;
  Materials: string;
  OtherFeatures: string;
  Weight: string;
  Code: string;
  NCM: string;
  EAN: string;
}

function ScreenProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [variations, setVariations] = useState<Product[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // limpa os dados para forçar recarregar
    setProduct(null);
    setVariations([]);
    setSelectedColorId(null);

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/GetProductDetail/${id}`);
        setProduct(res.data.product);
        setVariations(res.data.variations);
        setSelectedColorId(res.data.product.ColorLine?.id || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  // Capacidades únicas
  const capacities = Array.from(
    new Set(variations.map((v) => v.ProductCapacity?.capacity))
  );

  // Cores disponíveis para a capacidade atual
  const colors = variations
    .filter((v) => v.ProductCapacity?.id === product.ProductCapacity?.id)
    .map((v) => v.ColorLine)
    .filter(Boolean);

  const handleCapacityClick = (capacity: string) => {
    // Procura uma variação com a capacidade clicada e cor selecionada
    let newProduct = variations.find(
      (v) =>
        v.ProductCapacity?.capacity === capacity &&
        v.ColorLine?.id === selectedColorId
    );

    // Se não tiver a cor atual nessa capacidade, pega qualquer cor
    if (!newProduct) {
      newProduct = variations.find(
        (v) => v.ProductCapacity?.capacity === capacity
      );
    }

    if (newProduct) {
      navigate(`/produto/${newProduct.id}`);
    }
  };

  const handleColorClick = (colorId: string) => {
    // Procura uma variação com a cor clicada e capacidade atual
    const newProduct = variations.find(
      (v) =>
        v.ColorLine?.id === colorId &&
        v.ProductCapacity?.id === product.ProductCapacity?.id
    );

    if (newProduct) {
      navigate(`/produto/${newProduct.id}`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col mx-52 mt-12">
        <div className="flex flex-row gap-20">
          <img src={product.Image} alt={product.name} className="w-[40px] h-[40px]" />

          <div className="min-w-[1000px]">
            <h1 className="text-web-red w-[45%] font-bold text-4xl mb-4">
              {product.name}
            </h1>
            <p className="text-black w-[70%] mb-4">{product.description}</p>

            <hr className="text-web-red w-[50%] mb-4" />

            <div className="bg-web-gray w-[50%] flex flex-col rounded-[10px] px-5 py-5 gap-5 select-none">
              <section>
                <h2 className="font-bold text-web-red text-2xl">
                  Modelos disponíveis:
                </h2>

                {capacities.map((cap) => (
                  <button
                    key={cap}
                    className={`mr-3 mt-2 px-5 py-1 rounded cursor-pointer ${
                      cap === product.ProductCapacity?.capacity
                        ? "bg-web-pink text-web-red font-bold border-1"
                        : "bg-web-red text-white"
                    }`}
                    onClick={() => handleCapacityClick(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </section>

              <section>
                <h2 className="font-bold text-web-red text-2xl">
                  Cores disponíveis:
                </h2>
                {colors.map((c) => (
                  <button
                    title={c.name}
                    key={c.id}
                    className="w-8 h-8 rounded-full mr-3 mt-2 cursor-pointer"
                    style={{
                      backgroundColor: c.code,
                    }}
                    onClick={() => handleColorClick(c.id)}
                  />
                ))}
              </section>
            </div>
          </div>
        </div>
        <section className="flex flex-col py-10">
          <h1 className="text-web-red font-bold text-2xl mb-5">Descrição: </h1>
          <p>Capacidade: {product.ProductCapacity.capacity}</p>
          <p>Peso: {product.Weight}</p>
          <p>Dimensões: {product.Dimensions}</p>
          <p>Material: {product.Materials}</p>
          <p className="my-5">
            Outras Características: {product.OtherFeatures}
          </p>
          <p>Código: {product.Code}</p>
          <p>NCM: {product.NCM}</p>
          <p>EAN: {product.EAN}</p>
        </section>

        <hr className="text-web-red w-full" />
      </div>
      <div className="flex flex-col gap-10 my-20 mx-80">
        <div className="flex flex-col gap-2">
          <p className="text-web-red font-bold text-2xl mb-5">Relacionados:</p>
          <Suggestions categoryId={product.Category.id} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-web-red font-bold text-2xl mb-5">Outros:</p>
          <Suggestions categoryId="" />
        </div>
      </div>
    </div>
  );
}

export default ScreenProduct;
