import { useEffect, useState } from "react";
import { api } from "../../service/api";
import BoxProduct from "../../components/product";
import LoadingIcon from "../../components/loadings/loadingIcon";
import LoadingPulse from "../../components/loadings/loadingPulse";

function ScreenProducts() {
  const [categorys, setCategorys] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1 });

  // estados de loading
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const listCategory = async () => {
    try {
      const response = await api.get("/listCategory");
      setCategorys(response.data.Categorys);
      if (response.data.Categorys.length > 0) {
        setSelectedCategory(response.data.Categorys[0].id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCategories(false); // finaliza loading
    }
  };

  const listProduct = async (categoryId: string, currentPage = 1) => {
    setLoadingProducts(true); // começa loading
    try {
      const response = await api.get(
        `/listProducts?category=${categoryId}&page=${currentPage}&limit=8`
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false); // finaliza loading
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setPage(1);
      listProduct(selectedCategory, 1);
    }
  }, [selectedCategory]);

  useEffect(() => {
    listCategory();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      listProduct(selectedCategory, page);
    }
  }, [page]);

  return (
    <div>
      <div className="flex justify-center bg-web-pink min-h-14 ">
        {loadingCategories ? (
          <LoadingPulse />
        ) : (
          <div className="flex justify-center">
            {categorys.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-0 cursor-pointer transition-all duration-700
                ${
                  selectedCategory === category.id
                    ? "bg-white text-web-red text-[20px]"
                    : "hover:bg-white hover:text-web-red hover:text-[20px]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

       
      <div className="flex justify-center mt-12 min-h-[200px]">
        {loadingProducts ? (
          <LoadingIcon />
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-lg">Nenhum produto encontrado nessa categoria.</p>
        ) : (
          <ul className="grid grid-cols-4 gap-20">
            {products.map((product: any) => (
              <BoxProduct
                key={product.id}
                id={product.id}
                img={product.Image}
                name={product.ProductLine.name}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center items-center mt-10 gap-4">
        {products.length > 0 && (
          <div>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-no-drop cursor-pointer"
            >
              Anterior
            </button>

            <span className="px-5">
              Página <strong>{page}</strong> de{" "}
              <strong>{pagination.totalPages}</strong>
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-no-drop cursor-pointer"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScreenProducts;
