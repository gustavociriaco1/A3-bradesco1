import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import "../auth.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (event) => {
    event.preventDefault();
    const { nomeCompleto, cpf, email, senha } = form;

    const dados = {
      nomeCompleto, // Alterado para "nomeCompleto"
      cpf,
      email,
      senha,
    };
    console.log("Enviando para o backend:", dados);

    try {
      const response = await fetch("http://localhost:8080/auth/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const texto = await response.text();
      console.log("Resposta do backend:", texto);
      alert(texto);
    } catch (err) {
      console.error("Erro ao chamar backend:", err);
    }
  };
  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bradesco.png"})`,
      }}
    >
      <div className="auth-panel">
        <h2 className="panel-title">Criar Conta</h2>

        <TextField
          margin="normal"
          required
          fullWidth
          id="nomeCompleto  "
          name="nomeCompleto"
          placeholder="Nome Completo"
          value={form.nomeCompleto}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="cpf"
          name="cpf"
          placeholder="CPF (somente números)"
          value={form.cpf}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="senha"
          name="senha"
          placeholder="Senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundcolor: "blue",
            color: "var(--white)",
          }}
          onClick={handleRegister}
        >
          Criar Conta
        </Button>
        <p className="switch-auth">
          Já tem uma conta?{" "}
          <span className="switch-auth-link" onClick={() => navigate("/")}>
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
}
