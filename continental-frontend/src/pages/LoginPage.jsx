import LayoutSplit from "../componentes/LayoutSplit";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // --- INÍCIO DA ALTERAÇÃO ---
    // Simulação de login para desenvolvimento
    console.log("Tentando fazer login com:", { email, senha });

    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simula uma resposta de sucesso da API
    localStorage.setItem("token", "fake-jwt-token-for-dev");
    alert("Login realizado com sucesso! (Modo de desenvolvimento)");
    navigate("/dashboard"); // Navega para o dashboard após o "login"

    /*
    // CÓDIGO ORIGINAL (descomente quando a API estiver pronta)
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        senha,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Erro no login";
      alert(msg);
    }
    */
    // --- FIM DA ALTERAÇÃO ---
  };

  const left = (
    <div className="left-content">
      <h1 className="brand">CONTINENTAL</h1>
      <p className="subtitle">
        Há anos servindo os maiores. Seu legado merece a plataforma Continental
      </p>
      <button className="cta" onClick={() => navigate("/register")}>
        Criar conta
      </button>
    </div>
  );

  const right = (
    <div className="right-content">
      <h2 className="panel-title">Bem-Vindo</h2>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Senha</label>
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button className="cta" onClick={handleLogin}>
        Acessar Plataforma
      </button>
    </div>
  );

  return <LayoutSplit left={left} right={right} />;
}
