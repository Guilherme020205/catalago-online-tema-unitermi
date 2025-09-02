import { useEffect, useState } from "react";
import { api } from "../../service/api";
import BoxProduct from "../../components/product";
import LoadingIcon from "../../components/loadings/loadingIcon";
import Menu from "./components/menu";

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
    <div className="flex">
      <Menu
        categorys={categorys}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        loadingCategories={loadingCategories}
      />

      <div className="flex-1 mr-10 mt-10 md:mt-0">
        <div className="flex justify-center mt-12 min-h-[200px]">
          {loadingProducts ? (
            <LoadingIcon />
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado nessa categoria.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
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

        <div>
          {products.length > 0 && (
            <div className="flex flex-row justify-center items-center mt-10 gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-no-drop cursor-pointer"
              >
                Anterior
              </button>

              <span className="flex flex-col gap-0">
                <p>Página</p>
                <p>
                  <strong>{page}</strong> de{" "}
                  <strong>{pagination.totalPages}</strong>
                </p>
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
    </div>
  );
}

export default ScreenProducts;
