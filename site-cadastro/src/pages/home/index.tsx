import { useNavigate } from "react-router-dom";

const ScreenHome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex mt-20 justify-center ">
      <div className="grid grid-cols-2 gap-10">
        <button onClick={() => navigate("/categorys")} className="buttonHome select-none">
          Categoria
        </button>
        <button onClick={() => navigate("/corLine")} className="buttonHome select-none">
          Linha de cores
        </button>
        <button
          onClick={() => navigate("/productCapacity")}
          className="buttonHome select-none"
        >
          Litragem dos produtos
        </button>
        <button
          onClick={() => navigate("/productLines")}
          className="buttonHome select-none"
        >
          Linhas de produtos
        </button>
        <button onClick={() => navigate("/product")} className="buttonHome select-none">
          Produtos
        </button>
      </div>
    </div>
  );
};
export default ScreenHome;
