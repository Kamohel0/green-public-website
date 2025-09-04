// src/api/authApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  withCredentials: true, // needed if refreshToken cookie is used
});

// Register
export const register = (data) => api.post("/register", data);

// Login
export const login = (data) => api.post("/login", data);

// Refresh Token
export const refresh = () => api.post("/refresh");

// Forgot Password
export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });

// Reset Password
export const resetPassword = (data) => api.post("/reset-password", data);

// 🔹 Get Profile
export const getProfile = () => api.get("/me");

// 🔹 Update Profile
export const updateProfile = (data) => api.put("/me", data);

// 🔹 Change Password
export const changePassword = (data) => api.post("/change-password", data);

export default api;
