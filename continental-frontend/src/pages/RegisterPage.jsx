import React, { useState } from "react";
import LayoutSplit from "../componentes/LayoutSplit";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    data_nasc: "",
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    // Simulação de registro para desenvolvimento
    console.log("Tentando registrar com:", form);

    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simula uma resposta de sucesso
    alert("Conta criada com sucesso! (Modo de desenvolvimento)");
    navigate("/"); // Navega para a página de login após o "registro"

    /*
    // CÓDIGO ORIGINAL (descomente quando a API estiver pronta)
    try {
      await axios.post("http://localhost:8080/api/register", form);
      alert("Conta criada com sucesso!");
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Erro ao registrar";
      alert(msg);
    }
    */
  };

  const left = (
    <div className="left-content">
      <h1 className="brand">CONTINENTAL</h1>
      <p className="subtitle">
        Bem vindo de volta — Há anos servindo os maiores
      </p>
      <button className="cta" onClick={() => navigate("/")}>
        Entrar
      </button>
    </div>
  );

  const right = (
    <div className="right-content register">
      <h2 className="panel-title">Criar Conta</h2>

      <label>Nome Completo</label>
      <input name="nome" value={form.nome} onChange={handleChange} />

      <label>CPF</label>
      <input name="cpf" value={form.cpf} onChange={handleChange} />

      <label>Data nascimento</label>
      <input
        name="data_nasc"
        type="date"
        value={form.data_nasc}
        onChange={handleChange}
      />

      <label>Email</label>
      <input name="email" value={form.email} onChange={handleChange} />

      <label>Senha</label>
      <input
        name="senha"
        type="password"
        value={form.senha}
        onChange={handleChange}
      />

      <button className="cta" onClick={handleRegister}>
        Registrar
      </button>
    </div>
  );

  return <LayoutSplit left={left} right={right} />;
}
