import { useNavigate } from "react-router-dom";

interface Product {
  id: string; // importante
  img: string;
  name: string;
}

function BoxProduct({ id, img, name }: Product) {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/produto/${id}`, { state: { id } }); // passa o id pelo state
  };

  return (
    <div
      onClick={goToProduct} // clique navega
      className="flex flex-col items-center p-4 rounded-2xl shadow-[2px_2px_7px_-4px_#ff0000] hover:shadow-[-4px_-4px_10px_-4px_#ff0000] duration-700 transition-all cursor-pointer"
    >
      <img src={img} alt={name} className="w-36" />
      <h1 className="text-[18px] font-bold">{name}</h1>
    </div>
  );
}

export default BoxProduct;
