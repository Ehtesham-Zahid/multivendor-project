import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  withCredentials: true,
});

// Add request interceptor to include Authorization header
API.interceptors.request.use(
  (config) => {
    console.log("=== AXIOS INTERCEPTOR CALLED ===");
    console.log("Request URL:", config.url);
    console.log("All cookies:", document.cookie);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    console.log("Extracted token:", token ? "EXISTS" : "MISSING");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "✅ Authorization header added:",
        `Bearer ${token.substring(0, 20)}...`
      );
    } else {
      console.log("❌ No token found, no Authorization header added");
    }

    console.log("Final headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("Interceptor error:", error);
    return Promise.reject(error);
  }
);

export default API;
