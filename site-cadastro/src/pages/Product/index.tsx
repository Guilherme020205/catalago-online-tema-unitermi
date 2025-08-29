import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";

interface Product {
  id: string;
  name: string;
  description: string;
  Image: string;
  Category: { name: string };
  ProductLine: { name: string };
  ColorLine: { name: string };
  ProductCapacity: { capacity: string } | null;
}

const ScreenProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  async function getProducts() {
    const response = await api.get("/listProducts");
    setProducts(response.data.products);
  }

  async function deleteProduct(id: string) {
    const confirmDelete = window.confirm("Deseja excluir este produto?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/deleteProduct/${id}`);
      getProducts();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao deletar produto");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col m-20">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold select-none">Produtos</p>
        <button
          onClick={() => navigate("/create-product")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Novo Produto
        </button>
      </div>

      <div>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between my-2 p-2 border rounded-lg"
            >
              <div className="flex gap-4">
                {product.Image && (
                  <img
                    src={product.Image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p>{product.description}</p>
                  <p className="text-sm text-gray-500">
                    Categoria: {product.Category?.name} | Linha:{" "}
                    {product.ProductLine?.name} | Cor: {product.ColorLine?.name}{" "}
                    | Capacidade: {product.ProductCapacity?.capacity || "—"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                  className="text-blue-500"
                >
                  <FaPencil />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-500"
                >
                  <IoTrashBin />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScreenProduct;
