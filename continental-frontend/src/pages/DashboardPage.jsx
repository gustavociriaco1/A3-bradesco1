import React from "react";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { RiPixFill } from "react-icons/ri";

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
        <FaUserCircle className="profile-icon" />
      </header>

      <main className="dashboard-main">
        <h2 className="dashboard-title">O que deseja fazer hoje?</h2>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Pesquisar..." />
        </div>

        <div className="actions">
          <div className="action-item" onClick={() => navigate("/pix")}>
            <div className="circle">
              <RiPixFill size={28} />
            </div>
            <p>PIX</p>
          </div>
          <div className="action-item">
            <div className="circle"></div>
            <p>UDC</p>
          </div>
          <div className="action-item">
            <div className="circle"></div>
            <p>UDC</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
