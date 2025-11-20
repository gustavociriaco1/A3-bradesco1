import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "../auth.css"; // Importa o CSS de autenticação
import { getPixKeyInfo } from "../Services/userApi"; // <-- ADICIONE ESTA LINHA

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

    try {
      // Chama a função da API para verificar a chave
      const data = await getPixKeyInfo(pixKey);

      // Verifica se a chave possui denúncias
      if (data.denuncias && data.denuncias.length > 0) {
        // A chave é maliciosa
        setVerificationResult({
          message: `Atenção: Esta chave PIX é maliciosa e possui ${data.denuncias.length} denúncia(s).`,
          status: "error", // 'error' para cor vermelha
        });
        setDenuncias(data.denuncias);
      } else {
        // A chave é válida, mas não tem denúncias
        setVerificationResult({
          message: "Nenhuma denúncia encontrada para esta chave.",
          status: "success", // 'success' para cor verde
        });
        setDenuncias([]);
      }
    } catch (error) {
      console.error("Erro ao verificar chave PIX:", error);
      setVerificationResult({
        message: "Chave PIX não encontrada ou inválida.",
        status: "error",
      });
      setDenuncias([]); // Limpa denúncias em caso de erro
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
        <h2 className="panel-title">Consulta de denúncias</h2>

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
