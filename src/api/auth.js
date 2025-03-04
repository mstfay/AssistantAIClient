import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance";
import Roles from "../constants/roles";

// Kullanıcı giriş fonksiyonu
export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/user/login", { email, password });
    if (res.data.success) {
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.data);
      console.log("Token stored:", localStorage.getItem("token"));
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
    const res = await axiosInstance.post("/user/register", userData);
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
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      return true;
    } else {
      console.error("Token süresi dolmuş.");
      localStorage.removeItem("token"); // Token süresi dolduğunda tokeni sil
      window.dispatchEvent(new Event("authChange")); // Navbar ve Sidebar güncellenecek
      return false;
    }
  } catch (err) {
    console.error("Token decode edilemedi:", err);
    localStorage.removeItem("token"); // Token decode edilemediğinde tokeni sil
    window.dispatchEvent(new Event("authChange")); // Navbar ve Sidebar güncellenecek
    return false;
  }
};

// Kullanıcının bilgilerini getir
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await axiosInstance.get("/user/profile", {
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
    console.log("Token mevcut değil veya geçersiz!");
    return Roles.GUEST;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded || !decoded.role) {
      return Roles.GUEST;
    }

    return decoded.role; // Token içinden rolü çekiyoruz
  } catch (err) {
    return Roles.GUEST;
  }
};

// **Logout Fonksiyonu Ekledik**
export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange")); // Navbar ve Sidebar güncellenecek
};
