import api from "./api.js";

/**
 * Login
 */
export const login = async (email, senha) => {
  const response = await api.post("auth/login", { email, senha });

  const token = response.data;

  // Salva token no navegador
  localStorage.setItem("token", token);

  return token;
};

/**
 * Registro de usuário
 */
export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

/**
 * Verificação de PIX
 */
export const verifyPixKey = async (key) => {
  const response = await api.post("/pix/verify", { key });
  return response.data;
};

/**
 * Registra denúncia (PRECISA DE TOKEN)
 */
export const registerDenuncia = async (denunciaData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("api/denuncias", denunciaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar denúncia no serviço:", error);
    throw error;
  }
};
