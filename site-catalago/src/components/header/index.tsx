import { useLocation, useNavigate } from "react-router-dom";
import slogan1 from "../../assets/logo-slogan-1.png";
import slogan2 from "../../assets/logo-slogan-2.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/quem-somos", label: "Quem somos" },
    { path: "/contatos", label: "Contatos" },
  ];

  return (
    <div className="flex bg-red justify-between items-center px-10 py-5">
      <img src={slogan1} alt="slogan1" className="w-56" />

      <div className="flex justify-center gap-2">
        {links.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`font-bold text-2xl px-6 py-1 rounded-2xl mr-2 transition duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-white text-red"
                    : "text-white hover:bg-white hover:text-red"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <img src={slogan2} alt="slogan2" className="w-56" />
    </div>
  );
}

export default Header;
