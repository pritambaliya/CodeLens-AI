import api from './api';

export const getReviews = async () => {
  const { data } = await api.get('/reviews');
  return data;
};

export const getReviewById = async (id) => {
  const { data } = await api.get(`/reviews/${id}`);
  return data;
};

export const createReview = async (formData) => {
  const { data } = await api.post('/reviews', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
