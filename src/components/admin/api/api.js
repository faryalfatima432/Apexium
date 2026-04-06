// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
// });

// // 🔐 Attach token automatically
// API.interceptors.request.use((req) => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const user = JSON.parse(localStorage.getItem("user"));

//   const token = admin?.token || user?.token;

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;

// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000"
// });

// // ✅ Attach token
// API.interceptors.request.use((req) => {
//     const admin = JSON.parse(localStorage.getItem("admin"));
//     if (admin?.token) {
//         req.headers.Authorization = admin.token;
//     }
//     return req;
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin"));

  if (admin?.token) {
    req.headers.Authorization = `Bearer ${admin.token}`;
  }

  return req;
});

export default API;