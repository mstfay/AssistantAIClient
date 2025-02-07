import axios from "axios";

const API_URL = "https://localhost:7033/api";

// Eski konuşmaları getir
export const fetchOldConversations = async (pageType) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    let endpoint = "";
    
    switch (pageType) {
      case "chatbot":
        endpoint = "/chatai/history";
        break;
      case "pdf-summarizer":
        endpoint = "/pdfai/history";
        break;
      case "image-editor":
        endpoint = "/imageai/history";
        break;
      default:
        return [];
    }

    const res = await axios.get(`${API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; // API'den dönen konuşma verileri
  } catch (err) {
    console.error("Geçmiş konuşmalar alınırken hata oluştu:", err);
    return [];
  }
};
