import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  Alert,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "../auth.css"; // Importa o CSS de autenticação
import {
  getPixKeyInfo,
  getMinhasDenuncias,
  deleteDenuncia,
} from "../Services/userApi"; //
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import DeleteIcon from "@mui/icons-material/Delete"; // 2. Importe o ícone de lixeira

const PixPage = () => {
  const [pixKey, setPixKey] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [denuncias, setDenuncias] = useState([]);
  const navigate = useNavigate(); // Inicialize o hook

  useEffect(() => {
    const fetchMinhasDenuncias = async () => {
      try {
        const data = await getMinhasDenuncias();
        setDenuncias(data);
      } catch (error) {
        console.error("Erro ao buscar as denúncias do usuário:", error);
        // Opcional: você pode mostrar uma mensagem de erro para o usuário aqui
      }
    };

    fetchMinhasDenuncias();
  }, []); // O array vazio garante que isso rode apenas uma vez quando o componente montar

  // 4. Adicione a função para lidar com a exclusão
  const handleDeleteDenuncia = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta denúncia?")) {
      try {
        await deleteDenuncia(id);
        setDenuncias(denuncias.filter((d) => d.id !== id)); // Remove da lista na UI
        alert("Denúncia excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir denúncia:", error);
        alert("Falha ao excluir denúncia. Tente novamente.");
      }
    }
  };

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
  // Função para navegar para a página de edição
  const handleAlterarDenuncia = (id) => {
    navigate(`/denuncia/editar/${id}`);
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
            sx={{
              mt: 2,
              justifyContent: "center",
              "& .MuiAlert-message": {
                color: "black",
              },
            }}
          >
            {verificationResult.message}
          </Alert>
        )}
        <div className="denunciadas-container">
          <h3 className="denunciadas-title">Minhas Chaves Denunciadas</h3>
          {denuncias.length > 0 ? (
            <List sx={{ backgroundColor: "white", borderRadius: 1 }}>
              {denuncias.map((denuncia) => (
                <ListItem
                  key={denuncia.id}
                  secondaryAction={
                    // 5. Agrupe os botões
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAlterarDenuncia(denuncia.id)}
                        sx={{ mr: 1 }} // Adiciona margem para separar os botões
                      >
                        Alterar
                      </Button>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteDenuncia(denuncia.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={denuncia.chavePix}
                    secondary={`Golpe: ${denuncia.tipoGolpe} - Valor: R$ ${denuncia.valorPerdido}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              Você ainda não registrou nenhuma denúncia.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixPage;
