import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  img: string;
  name: string;
}

function BoxProduct({ id, img, name }: Product) {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/produto/${id}`, { state: { id } });
  };

  return (
    <div
      onClick={goToProduct}
      className="w-48 h-64 cursor-pointer rounded-2xl shadow-[2px_2px_0px_-1px_#d0d0d0] hover:shadow-[6px_6px_0px_-1px_#d0d0d0] duration-700 transition-all p-2 bg-white"
    >
      <div className="flex flex-col items-center h-full">
        <img
          src={img}
          alt={name}
          className="w-full h-40 object-contain rounded-lg"
        />
        <h1 className="mt-2 text-center text-sm font-bold text-gray-800 line-clamp-2">
          {name}
        </h1>
      </div>
    </div>
  );
}

export default BoxProduct;
