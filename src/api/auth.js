// src/api/auth.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:7033/api/user";

// Kullanıcı giriş fonksiyonu
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });

    if (res.data.success) {
      console.log(res.data)
      localStorage.setItem("token", res.data.data);
      window.dispatchEvent(new Event("authChange")); // Navbar ve Sidebar güncellenecek
      return {
        success: true,
        message: res.data.message || "Giriş başarılı!",
      };
    }

    return {
      success: false,
      message: res.data.message || "Giriş başarısız!",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Giriş sırasında bir hata oluştu.",
    };
  }
};

// Kullanıcı kayıt fonksiyonu
export const register = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    if (res.data.success) {
      return {
        success: true,
        message: res.data.message || "Kayıt başarılı!",
      };
    }

    return {
      success: false,
      message: res.data.message || "Kayıt başarısız!",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Kayıt sırasında bir hata oluştu.",
    };
  }
};

// Kullanıcının token geçerliliğini kontrol etme
export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

// Kullanıcının bilgilerini getir
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; // Kullanıcı bilgileri döndürülecek
  } catch (err) {
    console.error("Kullanıcı bilgileri alınamadı:", err);
    return null;
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  
  if (!token || token === "undefined") {
    console.error("Token mevcut değil veya geçersiz!");
    return "Guest"; // Kullanıcı giriş yapmadıysa Guest olarak kabul edelim
  }

  try {
    const decoded = jwtDecode(token);
    console.log("test", decoded.role)
    if (!decoded || !decoded.role) {
      console.error("Token geçersiz veya role bilgisi eksik:", decoded);
      return "Guest";
    }

    return decoded.role; // Token içinden rolü çekiyoruz
  } catch (err) {
    console.error("Geçersiz token veya decode hatası:", err);
    return "Guest";
  }
};




// **Logout Fonksiyonu Ekledik**
export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange")); // Navbar ve Sidebar güncellenecek
};
