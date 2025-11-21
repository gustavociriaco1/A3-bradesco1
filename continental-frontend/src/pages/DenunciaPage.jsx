import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "../auth.css";
import { registerDenuncia } from "../Services/userApi";
import { useNavigate } from "react-router-dom";

const DenunciaPage = () => {
  const navigate = useNavigate();

  const [scammerKey, setScammerKey] = useState("");
  const [scamType, setScamType] = useState("");
  const [bank, setBank] = useState("");
  const [description, setDescription] = useState("");
  const [amountLost, setAmountLost] = useState("");

  const [Name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de campos
    const reportData = {
      chavePix: scammerKey,
      tipoGolpe: scamType,
      nomeGolpista: Name,
      banco: bank,
      descricao: description,
      valorPerdido: parseFloat(amountLost),
    };

    for (const key in reportData) {
      if (!reportData[key]) {
        alert(`Por favor, preencha todos os campos.`);
        return;
      }
    }

    try {
      await registerDenuncia(reportData);
      alert("Denúncia registrada com sucesso!");

      // Limpa o formulário
      setScammerKey("");
      setScamType("");
      setName("");
      setBank("");
      setDescription("");
      setAmountLost("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Falha ao registrar denúncia.";
      console.error("Erro ao registrar denúncia:", error);
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
        <h2 className="panel-title">Registrar Denúncia</h2>

        <TextField
          margin="normal"
          required
          fullWidth
          id="scammerKey"
          placeholder="Chave PIX do Golpista"
          name="scammerKey"
          value={scammerKey}
          onChange={(e) => setScammerKey(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="scamType"
          placeholder="Tipo do Golpe (Ex: Falso parente, Loja falsa)"
          name="scamType"
          value={scamType}
          onChange={(e) => setScamType(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="Name"
          placeholder="Nome do Golpista"
          name="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="bank"
          placeholder="Qual o banco ?"
          name="bank"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          id="description"
          placeholder="Descrição da Denúncia"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          id="amountLost"
          placeholder="Quanto foi perdido? (Ex: 150.50)"
          name="amountLost"
          value={amountLost}
          onChange={(e) => setAmountLost(e.target.value)}
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
          onClick={handleSubmit}
        >
          Registrar Denúncia
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 1,
            mb: 2,
          }}
          onClick={() => navigate("/dashboard")}
        >
          Voltar para o Dashboard
        </Button>
      </div>
    </div>
  );
};
export default DenunciaPage;
