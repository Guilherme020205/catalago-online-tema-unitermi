import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RiLogoutCircleFill } from "react-icons/ri";
import logo from "../../assets/6Uu1ixeg.png";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex bg-web-gray justify-between items-center px-2 md:px-10 py-2 select-none">
      <img src={logo} alt="logo" className="w-20 md:w-32 cursor-pointer" onClick={() => navigate("/home")} />
      <button
        onClick={handleLogout}
        className="flex flex-row items-center gap-1 text-web-red hover:text-red-600 transition-all duration-700  cursor-pointer"
      >
        <RiLogoutCircleFill className="text-3xl" />
        <p className="text-xs md:text-xl">Sair do <p>sistema</p></p>
      </button>
    </div>
  );
}

export default Header;
