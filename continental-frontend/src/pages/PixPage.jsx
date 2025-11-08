import React, { useState } from "react";
import "../pix.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";
// import { verifyPixKey } from "../services/pixApi"; // Descomente quando a API estiver pronta

const PixPage = () => {
  const [pixKey, setPixKey] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const handleVerifyKey = async () => {
    if (!pixKey) {
      setVerificationResult({
        message: "Por favor, insira uma chave PIX.",
        status: "error",
      });
      return;
    }
    // --- INÍCIO DA SIMULAÇÃO ---
    console.log("Verificando chave:", pixKey);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simula atraso de rede

    // Simula uma resposta de sucesso ou erro
    if (pixKey === "chave-valida@email.com") {
      setVerificationResult({
        message: "Chave válida para: Usuário Exemplo",
        status: "success",
      });
    } else {
      setVerificationResult({
        message: "Chave PIX não encontrada ou inválida.",
        status: "error",
      });
    }
    // --- FIM DA SIMULAÇÃO ---

    /*
    // CÓDIGO ORIGINAL (descomente quando a API estiver pronta)
    try {
      const data = await verifyPixKey(pixKey);
      setVerificationResult({ message: data.message, status: "success" });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Erro ao verificar a chave";
      setVerificationResult({ message: msg, status: "error" });
    }
    */
  };

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
            <input
              type="text"
              placeholder="Chave-PIX"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
            />
          </div>
          <div className="pix-buttons">
            <button className="btn-yellow" onClick={handleVerifyKey}>
              Verificar Chave
            </button>
          </div>

          {verificationResult && (
            <div
              className={`verification-message ${verificationResult.status}`}
            >
              {verificationResult.message}
            </div>
          )}

          <div className="pix-lists">
            <div className="pix-section">Chaves Favoritas:</div>
            <div className="pix-section">Chaves Denunciadas:</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PixPage;
