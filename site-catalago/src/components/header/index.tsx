import { useLocation, useNavigate } from "react-router-dom";
import slogan1 from "../../assets/logo-slogan-1.png";
import slogan2 from "../../assets/logo-slogan-2.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/produtos", label: "Produtos" },
    { path: "/contatos", label: "Contatos" },
    { path: "/vagas", label: "Vagas" },
  ];

  return (
    <div
      className="flex flex-col bg-web-red justify-between items-center px-10 py-5
       xl:flex-row 
    "
    >
      <img src={slogan1} alt="slogan1" className="w-40 xl:w-36 2xl:w-56" />

      <div className="flex justify-center gap-2 my-5 lg:my-0">
        {links.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`font-bold text-[12px] px-6 py-1 rounded-2xl mr-2 transition duration-700 cursor-pointer
                ${
                  isActive
                    ? "bg-white text-web-red"
                    : "text-white hover:bg-white hover:text-web-red"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <img src={slogan2} alt="slogan2" className="w-32 xl:w-36 2xl:w-56" />
    </div>
  );
}

export default Header;
