import api from "./api.js";

/**
 * Realiza o login do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} senha - A senha do usuário.
 * @returns {Promise<object>} Os dados da resposta, incluindo o token.
 */
export const login = async (email, senha) => {
  const response = await api.post("auth/login", { email, senha });
  return response.data;
};

/**
 * Registra um novo usuário.
 * @param {object} userData - Os dados do formulário de registro.
 * @returns {Promise<object>} A resposta da API.
 */
export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

/**
 * Verifica uma chave PIX na API.
 * @param {string} key - A chave PIX a ser verificada.
 * @returns {Promise<object>} Os dados da resposta da API.
 */
export const verifyPixKey = async (key) => {
  // O endpoint exato pode variar (ex: /pix/verify, /keys/pix, etc.)
  const response = await api.post("/pix/verify", { key });
  return response.data;
};
