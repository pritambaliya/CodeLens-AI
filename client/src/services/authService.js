import api from './api';

export const register = async ({ name, email, password }) => {
  const { data } = await api.post('/user/register', { name, email, password });
  
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const logout = async () => {
  const { data } = await api.get('/auth/logout');
  return data;
};

export const forgotPassword = async ({ email }) => {
  const { data } = await api.post("/auth/forgot-password", {
    email,
  });

  return data;
};

export const verifyOTP = async ({ email, otp }) => {
  const { data } = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return data;
};

export const resetPassword = async ({ email, otp, password }) => {
  const { data } = await api.post("/auth/reset-password", {
    email,
    otp,
    password,
  });

  return data;
};