import api from './api';
import { setToken } from '../utils/token';

export const register = async ({ name, email, password }) => {
  const { data } = await api.post('/user/register', { name, email, password });
  if (data.token) {
    setToken(data.token);
  }
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  if (data.token) {
    setToken(data.token);
  }
  return data;
};
