import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "../auth.css"; // Importa o CSS de autenticação

const PixPage = () => {
  const [pixKey, setPixKey] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyKey = async () => {
    if (!pixKey) {
      setVerificationResult({
        message: "Por favor, insira uma chave PIX.",
        status: "error",
      });
      return;
    }
    // --- INÍCIO DA SIMULAÇÃO ---
    console.log("Verificando chave:", pixKey);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simula atraso de rede

    // Simula uma resposta de sucesso ou erro
    if (pixKey === "chave-valida@email.com") {
      setVerificationResult({
        message: "Chave válida para: Usuário Exemplo",
        status: "success",
      });
    } else {
      setVerificationResult({
        message: "Chave PIX não encontrada ou inválida.",
        status: "error",
      });
    }
    // --- FIM DA SIMULAÇÃO ---
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bradesco.png"})`,
      }}
    >
      <div className="auth-panel">
        <h2 className="panel-title">Área PIX</h2>

        <TextField
          margin="normal"
          fullWidth
          id="pixKey"
          placeholder="Digite a Chave-PIX"
          name="pixKey"
          value={pixKey}
          onChange={(e) => setPixKey(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
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
          onClick={handleVerifyKey}
        >
          Verificar Chave
        </Button>

        {verificationResult && (
          <div
            style={{
              marginTop: "1rem",
              color: verificationResult.status === "error" ? "red" : "green",
              textAlign: "center",
            }}
          >
            {verificationResult.message}
          </div>
        )}

        <h3 className="denunciadas-title">Chaves Denunciadas:</h3>
        {/* Aqui você pode listar as chaves denunciadas */}
        <p style={{ color: "white", fontSize: "0.9rem" }}>
          Nenhuma chave denunciada.
        </p>
      </div>
    </div>
  );
};

export default PixPage;
