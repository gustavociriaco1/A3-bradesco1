import api from "./api.js";

/**
 * Realiza o login do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} senha - A senha do usuário.
 * @returns {Promise<object>} Os dados da resposta, incluindo o token.
 */
export const login = async (email, senha) => {
  // Endpoint corrigido para "/auth/login"
  const response = await api.post("/auth/login", { email, senha });

  // Extrai o token do objeto de resposta
  const { token } = response.data;

  if (token) {
    // Salva o token no navegador
    localStorage.setItem("token", token);
  }

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
/**
 * Registra uma nova denúncia.
 * @param {object} denunciaData - Os dados do formulário de denúncia.
 * @returns {Promise<object>} A resposta da API.
 */
export const registerDenuncia = async (denunciaData) => {
  try {
    // CORREÇÃO: Adicionado "/" no início do endpoint.
    // O interceptor do Axios em `api.js` já adiciona o token automaticamente.
    const response = await api.post("/api/denuncias", denunciaData);
    return response.data;
  } catch (error) {
    // Loga o erro para depuração e relança para que o componente possa tratá-lo
    console.error("Erro ao registrar denúncia no serviço:", error);
    throw error;
  }
};
