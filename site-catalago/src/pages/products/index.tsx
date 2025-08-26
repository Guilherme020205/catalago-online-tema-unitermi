import { useEffect, useState } from "react";
import { api } from "../../service/api";
import BoxProduct from "../../components/product";

function ScreenProducts() {
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const listCategory = async () => {
    try {
      const response = await api.get("/listCategory");
      setCategorys(response.data.Categorys);
      if (response.data.Categorys.length > 0) {
        setSelectedCategory(response.data.Categorys[0].id); // seleciona a primeira por padrão
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listProduct = async (categoryId: string) => {
    try {
      const response = await api.get(`/listProducts?category=${categoryId}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // Sempre que a categoria muda aqui ele lista os produtos
  useEffect(() => {
    if (selectedCategory) {
      listProduct(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    listCategory();
  }, []);

  return (
    <div>
      <div>
        <ul className="flex justify-center bg-web-pink">
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
        </ul>
      </div>

      <div className="flex justify-center mt-12">
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
      </div>
    </div>
  );
}

export default ScreenProducts;
