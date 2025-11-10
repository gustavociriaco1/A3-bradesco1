import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PixPage from "./pages/PixPage";
import DenunciaPage from "./pages/DenunciaPage"; // CORREÇÃO: O nome do arquivo é DenunciaPage
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pix" element={<PixPage />} />
        <Route path="/denuncia" element={<DenunciaPage />} /> {/* Adiciona a nova rota */}

      </Routes>
    </BrowserRouter>
  );
}
