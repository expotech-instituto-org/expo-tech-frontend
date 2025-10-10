import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

api.defaults.maxRedirects = 0;

//Caso precisemos usar para chamar rotas protegidas
// api.interceptors.request.use(
//   (config) => {
//     if (!config.url?.includes("/auth/login")) {
//       const token = Cookies.get("token");
//       const numero = Cookies.get("numero");
//       if (token && numero) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export { api };
