import axios from "axios";

const api = axios.create({
  baseURL: "https://url-shortener-1-qson.onrender.com/api",
});

export default api;