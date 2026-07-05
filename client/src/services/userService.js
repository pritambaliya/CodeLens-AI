import api from './api';

export const getProfile = async () => {
  const { data } = await api.get('/user/profile');
  return data;
};

export const updateProfile = async (formData) => {
  const { data } = await api.put(
    "/user/profile/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
export const deleteProfile  = async () => {
  const { data } = await api.delete('/user/delete-account');
  return data;
};
