import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // URL base da sua API
});

// Adiciona um interceptor para incluir o token de autenticação em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
