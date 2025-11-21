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
 * Busca informações de denúncias para uma chave PIX específica.
 * @param {string} key - A chave PIX a ser consultada.
 * @returns {Promise<object>} Um objeto contendo um array de denúncias.
 */
export const getPixKeyInfo = async (key) => {
  try {
    // A resposta da API (response.data) provavelmente é o array de denúncias diretamente.
    const denunciasArray = await api.get(`api/denuncias/chave/${key}`);

    // Envelopamos o array em um objeto com a propriedade "denuncias",
    // que é o que o componente PixPage espera.
    return { denuncias: denunciasArray.data };
  } catch (error) {
    // Se a API retornar um erro (ex: 404 Not Found), o catch no PixPage.jsx irá tratar.
    console.error("Erro ao buscar informações da chave PIX:", error);
    throw error; // Relança o erro para ser tratado no componente.
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
