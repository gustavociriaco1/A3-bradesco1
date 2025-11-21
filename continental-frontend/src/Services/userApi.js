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

/**
 * Busca informações de uma chave PIX na API.
 * @param {string} chavePix - A chave PIX a ser consultada.
 * @returns {Promise<object>} Os dados da resposta da API.
 */
export const getPixKeyInfo = async (key) => {
  try {
    const response = await api.get(`api/denuncias/chave/${key}`);

    // O backend retorna 1 para maliciosa e 0 para normal.
    const isMalicious = response.data === 1;

    return { malicious: isMalicious };
  } catch (error) {
    // Se a API retornar um erro (ex: 404), consideramos que a chave não tem denúncias.
    if (error.response && error.response.status === 404) {
      return { malicious: false }; // Chave não encontrada = não é maliciosa
    }
    console.error("Erro ao buscar informações da chave PIX:", error);
    throw error; // Propaga outros erros para serem tratados na UI
  }
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
