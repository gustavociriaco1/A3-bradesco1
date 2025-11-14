import React from "react";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";
import "../auth.css"; // Importar o CSS de autenticação
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PixIcon from "@mui/icons-material/Pix";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout"; // Importar ícone de logout

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = "User Teste"; // substituir pelo nome vindo do backend
  const saldo = "R$ 12.345,67";

  const handleLogout = () => {
    // Adicionar lógica de logout aqui (ex: limpar token)
    navigate("/login");
  };

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bradesco.png"})`,
      }}
    >
      <header className="dashboard-header">
        <div className="header-right">
          <div className="user-info">
            <AccountCircleIcon sx={{ color: "white", mr: 1 }} />
            <p className="user-greeting">Olá, {user}</p>
          </div>
          <LogoutIcon
            onClick={handleLogout}
            sx={{ color: "white", cursor: "pointer", ml: 3 }}
          />
        </div>
      </header>
      <main className="dashboard-main">
        <div className="balance-card">
          <p className="user-balance">Saldo em conta</p>
          <p className="balance-amount">{saldo}</p>
        </div>

        <h2 className="dashboard-title">O que deseja fazer hoje?</h2>

        <div className="actions">
          <div className="action-item" onClick={() => navigate("/pix")}>
            <div className="circle">
              <PixIcon sx={{ fontSize: 32 }} />
            </div>
            <p>Área PIX</p>
          </div>

          <div className="action-item" onClick={() => navigate("/denuncia")}>
            <div className="circle">
              <CampaignIcon sx={{ fontSize: 32 }} />
            </div>
            <p>Denúncia</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
