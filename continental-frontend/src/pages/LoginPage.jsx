import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { login } from "../Services/userApi";
import "../auth.css"; // Importe o novo CSS

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Por favor, preencha o email e a senha.");
      return;
    }

    try {
      const response = await login(email, senha); // Chame a função login
      console.log("Resposta do backend:", response);
      alert("Login realizado com sucesso!");
      navigate("/dashboard"); // Redirecione para a página de dashboard
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
        <h2 className="panel-title">Bem-Vindo </h2>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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
          onClick={handleLogin}
        >
          Acessar Plataforma
        </Button>
        <p className="switch-auth">
          Não tem uma conta?{" "}
          <span
            className="switch-auth-link"
            onClick={() => navigate("/register")}
          >
            Crie uma agora
          </span>
        </p>
      </div>
    </div>
  );
}
