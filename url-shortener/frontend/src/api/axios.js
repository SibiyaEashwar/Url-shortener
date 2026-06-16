import axios from "axios";

const api = axios.create({
  baseURL: "https://url-shortener-backend-6u9y.onrender.com",
});

export default api;