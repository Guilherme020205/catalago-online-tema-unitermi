import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { AuthContext } from "../../context/AuthContext";

const ScreenLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault(); 
    try {
      const response = await api.post("/login", {
        user,
        password,
      });
      login(response.data.token);
      navigate("/home");
    } catch (error) {
      alert("Erro ao fazer login!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default ScreenLogin;
