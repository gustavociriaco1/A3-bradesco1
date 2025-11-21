import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { getDenunciaById, updateDenuncia } from "../Services/userApi";
import "../auth.css";

const EditarDenunciaPage = () => {
  const { id } = useParams(); // Pega o ID da denúncia da URL
  const navigate = useNavigate();

  const [scammerKey, setScammerKey] = useState("");
  const [scamType, setScamType] = useState("");
  const [bank, setBank] = useState("");
  const [description, setDescription] = useState("");
  const [amountLost, setAmountLost] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");
  const [Name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDenuncia = async () => {
      try {
        const data = await getDenunciaById(id);
        // Formata a data para o formato YYYY-MM-DD que o input type="date" espera
        const formattedDate = new Date(data.dataDenuncia)
          .toISOString()
          .split("T")[0];

        setScammerKey(data.chavePix);
        setScamType(data.tipoGolpe);
        setName(data.nomeGolpista);
        setBank(data.banco);
        setDescription(data.descricao);
        setAmountLost(data.valorPerdido);
        setDateOfIncident(formattedDate);
        setLoading(false);
      } catch (err) {
        setError(
          "Falha ao carregar os dados da denúncia. Verifique se você tem permissão."
        );
        setLoading(false);
        console.error(err);
      }
    };

    fetchDenuncia();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      chavePix: scammerKey,
      tipoGolpe: scamType,
      nomeGolpista: Name,
      banco: bank,
      descricao: description,
      valorPerdido: parseFloat(amountLost),
      dataDenuncia: dateOfIncident,
    };

    try {
      await updateDenuncia(id, reportData);
      alert("Denúncia atualizada com sucesso!");
      navigate("/pix"); // Redireciona para a página de consulta após a edição
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Falha ao atualizar denúncia.";
      console.error("Erro ao atualizar denúncia:", error);
      alert(errorMessage);
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bradesco.png"})`,
      }}
    >
      <div className="auth-panel">
        <h2 className="panel-title">Editar Denúncia</h2>

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
          Salvar Alterações
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

export default EditarDenunciaPage;
