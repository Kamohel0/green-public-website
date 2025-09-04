// src/api/authApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://a222289752c6.ngrok-free.app/api/auth",
  withCredentials: true, // keep true if backend uses cookies for refresh tokens
});

// ✅ Register (expects { name, email, password })
export const register = (data) =>
  api.post("/register", {
    name: data.name,
    email: data.email,
    password: data.password,
  });

// ✅ Login (expects { email, password })
export const login = (data) =>
  api.post("/login", {
    email: data.email,
    password: data.password,
  });

// ✅ Refresh Token
export const refresh = () => api.post("/refresh");

// ✅ Forgot Password (expects { email })
export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });

// ✅ Reset Password (expects { token, newPassword, confirmPassword })
export const resetPassword = (data) =>
  api.post("/reset-password", {
    token: data.token,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
  });

// ✅ Get Profile
export const getProfile = () => api.get("/me");

// ✅ Update Profile
export const updateProfile = (data) => api.put("/me", data);

// ✅ Change Password
export const changePassword = (data) =>
  api.post("/change-password", {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  });

export default api;
