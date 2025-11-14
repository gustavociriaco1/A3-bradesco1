import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { register } from "../Services/userApi";
import "../auth.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",

    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    // Validação para garantir que todos os campos estão preenchidos
    for (const key in form) {
      if (!form[key]) {
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
    }

    try {
      // Chama a função de registro da API
      const response = await register(form);
      console.log("Resposta do registro:", response);
      alert("Conta criada com sucesso! Você será redirecionado para o login.");
      navigate("/"); // Navega para a página de login
    } catch (error) {
      // Exibe uma mensagem de erro mais específica se disponível
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao criar conta. Tente novamente.";
      console.error("Erro no registro:", error);
      alert(errorMessage);
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
          id="nome"
          name="nome"
          placeholder="Nome Completo"
          value={form.nome}
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
