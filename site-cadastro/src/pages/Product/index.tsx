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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 30;

  async function getProducts() {
    try {
      const response = await api.get("/products/search", {
        params: {
          name: search,
          page,
          limit,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error: any) {
      console.error(error);
      alert("Erro ao buscar produtos");
    }
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
  }, [search, page]);

  return (
    <div className="flex flex-col m-5 md:m-20">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold select-none">Produtos</p>
        <button
          onClick={() => navigate("/create-product")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Novo Produto
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={() => {
            setPage(1);
            getProducts();
          }}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded"
        >
          Buscar
        </button>
      </div>

      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-row gap-4 justify-between my-2 p-2 border rounded-lg break-all"
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
                  {product.ProductLine?.name} | Cor: {product.ColorLine?.name} |
                  Capacidade: {product.ProductCapacity?.capacity || "—"}
                </p>
              </div>
            </div>
            <div className="flex gap-5 mt-5 items-start">
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="text-blue-500 cursor-pointer"
              >
                <FaPencil />
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 cursor-pointer"
              >
                <IoTrashBin />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border cursor-pointer rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border cursor-pointer rounded ${
              p === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ScreenProduct;
