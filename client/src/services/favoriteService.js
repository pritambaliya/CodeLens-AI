import api from './api';

export const getFavorites = async () => {
  const { data } = await api.get('/favorites');
  return data;
};

export const addFavorite = async (reviewId) => {
  const { data } = await api.post(`/favorites/${reviewId}`);
  return data;
};

export const removeFavorite = async (id) => {
  const { data } = await api.delete(`/favorites/${id}`);
  return data;
};
