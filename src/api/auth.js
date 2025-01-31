import axios from "axios";

const API_URL = "https://localhost:7033/api/user"; 

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    return true;
  } catch (err) {
    console.error("Giriş başarısız", err);
    return false;
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Kayıt işlemi başarısız.",
    };
  }
};
