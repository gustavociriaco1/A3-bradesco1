
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
// import api from "../Services/Api"; // Não precisamos da API por enquanto

const DenunciaPage = () => {
  const [scammerKey, setScammerKey] = useState("");
  const [description, setDescription] = useState("");
  const [amountLost, setAmountLost] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");
  const [platform, setPlatform] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = {
      scammer_key: scammerKey,
      description,
      amount_lost: amountLost,
      date_of_incident: dateOfIncident,
      platform,
    };

    try {
      // Linha original que causa o erro (agora comentada)
      // await api.post("/reports", reportData);

      // Simulação: Exibe os dados no console e um alerta para o usuário
      console.log("Dados da denúncia a serem enviados:", reportData);
      alert("Simulação: Denúncia registrada com sucesso!");

      // Limpa o formulário
      setScammerKey("");
      setDescription("");
      setAmountLost("");
      setDateOfIncident("");
      setPlatform("");
    } catch (error) {
      console.error("Erro ao registrar denúncia:", error);
      alert("Falha ao registrar denúncia.");
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Denúncia</h2>

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
        multiline
        rows={4}
        id="description"
        placeholder="Descrição do Golpe"
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
        placeholder="Quando aconteceu?"
        name="dateOfIncident"
        value={dateOfIncident}
        onChange={(e) => setDateOfIncident(e.target.value)}
        sx={{ backgroundColor: "white", borderRadius: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="platform"
        placeholder="Onde aconteceu o PIX? (Ex: App do Banco)"
        name="platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        sx={{ backgroundColor: "white", borderRadius: 1 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "var(--gold)", color: "var(--bg)" }}
        onClick={handleSubmit}
      >
        Registrar Denúncia
      </Button>
    </div>
  );
};
export default DenunciaPage;
