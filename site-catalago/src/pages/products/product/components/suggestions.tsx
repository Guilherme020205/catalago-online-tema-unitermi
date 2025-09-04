import { useEffect, useState } from "react";
import BoxProduct from "../../../../components/product";
import { api } from "../../../../service/api";
import LoadingIcon from "../../../../components/loadings/loadingIcon";

interface Info {
  categoryId?: string;
  limit?: string;
}

function Suggestions({ categoryId, limit }: Info) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const listProduct = async () => {
    setLoadingProducts(true);
    try {
      const response = await api.get(
        `/listProductsSuggestions?category=${categoryId}&limit=${limit}`
      );
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        {loadingProducts ? (
          <LoadingIcon />
        ) : products.length === 0 ? (
          <p>Pedimos desculpas, mas não encontramos produtos...</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-14 lg:gap-20">
            {products.map((product: any) => (
              <BoxProduct
                key={product.id}
                id={product.id}
                img={product.Image}
                name={product.productLineName}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
