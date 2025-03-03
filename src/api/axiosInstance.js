// src/api/axiosInstance.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:7033/api";

// Yeni bir axios instance oluşturuyoruz.
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// İsteğe başlamadan önce token kontrolü yapan interceptor ekleyelim:
axiosInstance.interceptors.request.use(
  (config) => {
    // Login isteği yapılırken token kontrolünü atla
    if (config.url.includes("/user/login")) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      // Token yoksa, kullanıcıyı login sayfasına yönlendir.
      window.location.href = "/login";
      return Promise.reject(new Error("Token mevcut değil."));
    }
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token süresi dolmuşsa, kullanıcıyı login sayfasına yönlendir.
        window.location.href = "/login";
        return Promise.reject(new Error("Token süresi dolmuş."));
      }
    } catch (err) {
      // Token decode edilemiyorsa da yönlendir.
      window.location.href = "/login";
      return Promise.reject(err);
    }
    // Token geçerliyse, Authorization header'ını ekle.
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
