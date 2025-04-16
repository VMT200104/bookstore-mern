import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bookstore-mern-lh17.onrender.com", // Backend URL đã deploy
  withCredentials: true, // Nếu bạn cần gửi cookie hoặc xác thực
});

export default axiosInstance;
