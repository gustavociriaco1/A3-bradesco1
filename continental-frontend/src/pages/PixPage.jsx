import React, { useState } from "react";
import { TextField, Button, InputAdornment, Alert } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "../auth.css"; // Importa o CSS de autenticação
import { getPixKeyInfo } from "../Services/userApi"; //

const PixPage = () => {
  const [pixKey, setPixKey] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [denuncias, setDenuncias] = useState([]);
  const handleVerifyKey = async () => {
    if (!pixKey) {
      setVerificationResult({
        message: "Por favor, insira uma chave PIX.",
        status: "error",
      });
      return;
    }

    try {
      // Chama o back-end e a resposta já é a string que você precisa
      const result = await getPixKeyInfo(pixKey);

      // Use .trim() para remover espaços em branco antes de comparar
      const trimmedResult = typeof result === "string" ? result.trim() : "";

      if (trimmedResult === "CHAVE COM SUSPEITA DE FRAUDE") {
        setVerificationResult({
          message: "Atenção: Esta chave PIX apresenta suspeita de fraude!",
          status: "error",
        });
      } else if (trimmedResult === "CHAVE SEM ANOMALIA") {
        setVerificationResult({
          message: "Esta chave PIX não possui anomalias registradas.",
          status: "success",
        });
      } else if (trimmedResult === "NENHUMA DENUNCIA ENCONTRADA") {
        setVerificationResult({
          message: "Nenhuma denúncia encontrada para esta chave PIX.",
          status: "success",
        });
      } else {
        // Adicione um console.log aqui para depurar o que está vindo do backend
        console.log("Resposta recebida do servidor:", result);
        setVerificationResult({
          message: "Resposta inesperada do servidor. Verifique o console.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao verificar chave PIX:", error);
      setVerificationResult({
        message: "Erro ao consultar chave PIX.",
        status: "error",
      });
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
          <Alert
            severity={verificationResult.status}
            sx={{ mt: 2, justifyContent: "center" }}
          >
            {verificationResult.message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default PixPage;
