import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
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
      // Chama o back-end
      const response = await getPixKeyInfo(pixKey);

      const result = response.data; // resposta é uma STRING

      if (result === "CHAVE COM SUSPEITA DE FRAUDE") {
        setVerificationResult({
          message: "Atenção: Esta chave PIX apresenta suspeita de fraude!",
          status: "error",
        });
      } else if (result === "CHAVE SEM ANOMALIA") {
        setVerificationResult({
          message: "Esta chave PIX não possui anomalias registradas.",
          status: "success",
        });
      } else if (result === "NENHUMA DENUNCIA ENCONTRADA") {
        setVerificationResult({
          message: "Nenhuma denúncia encontrada para esta chave PIX.",
          status: "success",
        });
      } else {
        // Caso o backend retorne algo inesperado
        setVerificationResult({
          message: "Resposta inesperada do servidor.",
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
      </div>
    </div>
  );
};

export default PixPage;
