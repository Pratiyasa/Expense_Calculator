import api from "../api/axios";

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const refreshToken = async () => {
  const res = await api.post("/auth/refresh-token");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/current-user");
  return res.data;
};

