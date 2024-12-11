import axios from "axios";

const BASE_URL = "http://192.168.1.200:8080/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default api;
