import api from './api';

export const getProfile = async () => {
  const { data } = await api.get('/user/profile');
  return data;
};
