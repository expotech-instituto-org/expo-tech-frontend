import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

api.defaults.maxRedirects = 0;

api.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/login")) {
      const adminToken = Cookies.get("admin-token");
      const visitanteToken = Cookies.get("visitante-token");
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      } else if (visitanteToken) {
        config.headers.Authorization = `Bearer ${visitanteToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 403) {
      const path = window.location.pathname;
      const loginPath = path.startsWith("/admin")
        ? "/admin/login"
        : "/visitante/login";

      Cookies.remove("admin-token");
      Cookies.remove("visitante-token");

      window.location.href = loginPath;
    }

    return Promise.reject(error);
  }
);

export { api };
