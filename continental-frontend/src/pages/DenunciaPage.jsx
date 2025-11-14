import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "../auth.css";

const DenunciaPage = () => {
  const [scammerKey, setScammerKey] = useState("");
  const [scamType, setScamType] = useState("");
  const [bank, setBank] = useState("");
  const [description, setDescription] = useState("");
  const [amountLost, setAmountLost] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = {
      scammer_key: scammerKey,
      scam_type: scamType,
      bank,
      description,
      amount_lost: amountLost,
      date_of_incident: dateOfIncident,
    };

    try {
      // Simulação: Exibe os dados no console e um alerta para o usuário
      console.log("Dados da denúncia a serem enviados:", reportData);
      alert("Simulação: Denúncia registrada com sucesso!");

      // Limpa o formulário
      setScammerKey("");
      setScamType("");
      setBank("");
      setDescription("");
      setAmountLost("");
      setDateOfIncident("");
    } catch (error) {
      console.error("Erro ao registrar denúncia:", error);
      alert("Falha ao registrar denúncia.");
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
          id="bank"
          placeholder="Qual o banco do golpista?"
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
        <TextField
          margin="normal"
          required
          fullWidth
          type="date"
          id="dateOfIncident"
          placeholder="Data da Denúncia"
          name="dateOfIncident"
          value={dateOfIncident}
          onChange={(e) => setDateOfIncident(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
          InputLabelProps={{
            shrink: true,
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
          onClick={handleSubmit}
        >
          Registrar Denúncia
        </Button>
      </div>
    </div>
  );
};
export default DenunciaPage;
