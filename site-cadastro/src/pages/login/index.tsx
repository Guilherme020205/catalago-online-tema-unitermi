import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/6Uu1ixeg.png";
import ReCAPTCHA from "react-google-recaptcha";
import "./Form.css";

const ScreenLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Por favor, confirme o reCAPTCHA");
      return;
    }

    if (!user || !password) {
      alert("Usuário e senha não enviados");
      return;
    }

    try {
      setIsLoggingIn(true);
      const response = await api.post("/login", {
        user,
        password,
      });
      login(response.data.token);
      navigate("/home");
    } catch (error) {
      alert("Erro ao fazer login!");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-row w-full h-screen justify-center gap-20">
      <div className="hidden lg:flex justify-center items-center w-full">
        <img src={logo} alt="logo" className="w-96 h-64" />
      </div>

      <div className="formulario w-full flex justify-center items-center">
        <div className="flex flex-col w-96">
          <h2 className="text-white font-bold text-6xl mb-5">Bem-Vindo!</h2>
          <div className="lg:hidden flex justify-center items-center bg-white rounded-2xl p-2 w-full">
            <img src={logo} alt="logo" className="w-52 h-32" />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col">
            <div className="inputGroup">
              <label htmlFor="user">Usuário:</label>
              <input
                id="user"
                type="text"
                required
                autoComplete="off"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Senha:</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <ReCAPTCHA
              sitekey="6LeiHLUrAAAAAGSZQOhJEfZEXNda-XPKmZojbD9G"
              onChange={(value) => setCaptchaValue(value)}
            />

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`cursor-pointer bg-white text-web-red my-5 py-5 px-36 rounded-2xl shadow-[2px_2px_7px_-2px_#ff0000] hover:bg-web-pink hover:shadow-[2px_2px_7px_-2px_#000] transition-all duration-700 ${
                isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScreenLogin;
