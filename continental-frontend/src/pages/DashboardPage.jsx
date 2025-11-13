import React from "react";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PixIcon from "@mui/icons-material/Pix";
import CampaignIcon from "@mui/icons-material/Campaign";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = "User Teste"; // substituir pelo nome vindo do backend
  const saldo = "R$ 12.345,67";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <p className="user-greeting">Olá, {user}</p>
          <p className="user-balance">
            Saldo em conta
            <br />
            {saldo}
          </p>
        </div>
        <h1 className="logo">Continental</h1>
        <div className="header-right-placeholder"></div>
      </header>
      <main className="dashboard-main">
        <h2 className="dashboard-title">O que deseja fazer hoje?</h2>

        <div className="actions">
          <div className="action-item" onClick={() => navigate("/pix")}>
            <div className="circle">
              <PixIcon sx={{ fontSize: 32, color: "#32BCAD" }} />
            </div>
            <p>Consulta</p>
          </div>

          <div className="action-item" onClick={() => navigate("/denuncia")}>
            <div className="circle">
              <CampaignIcon sx={{ fontSize: 32, color: "#E74C3C" }} />
            </div>
            <p>Denuncia</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
