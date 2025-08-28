import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ScreenHome = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Bem-vindo ao Dashboard</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default ScreenHome;
