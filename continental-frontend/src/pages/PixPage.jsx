import React from "react";
import "../pix.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const PixPage = () => {
  return (
    <div className="pix-container">
      <header className="pix-header">
        <h1 className="pix-logo">PIX</h1>
        <FaUserCircle className="profile-icon" />
      </header>

      <main className="pix-main">
        <div className="pix-box">
          <div className="pix-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Chave-PIX" />
          </div>
          <div className="pix-buttons">
            <button className="btn-yellow">Verificar Chave</button>
            <button className="btn-yellow">Realizar Transferência</button>
          </div>

          <div className="pix-lists">
            <div className="pix-section">Chaves Favoritas</div>
            <div className="pix-section">Chaves Denunciadas</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PixPage;
