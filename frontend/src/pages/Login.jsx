import "./Login.css";
import logo from "../assets/logo-sgc.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@sgc.com");
  const [senha, setSenha] = useState("123456");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/auth/login", {
        email,
        senha,
      });

      const dados = resposta.data;

      localStorage.setItem("token", dados.token);

      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );

      navigate("/dashboard");
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Erro ao conectar ao servidor"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-area">
          <img
            src={logo}
            alt="SGC"
            className="logo-img"
          />

          <p>Sistema de Gestão Condominial</p>

          <span>
            Organização, segurança e praticidade
            para o seu condomínio.
          </span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h1>Acesse sua conta</h1>

          <p>
            Entre com suas credenciais para acessar
            o sistema.
          </p>

          <form onSubmit={handleLogin}>
            <label>E-mail</label>

            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <label>Senha</label>

            <input
              type="password"
              placeholder="sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

            {erro && (
              <p
                style={{
                  color: "red",
                  marginTop: "10px",
                }}
              >
                {erro}
              </p>
            )}

            <button type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;