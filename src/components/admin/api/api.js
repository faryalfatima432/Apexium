import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));

  const token = admin?.token || user?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;