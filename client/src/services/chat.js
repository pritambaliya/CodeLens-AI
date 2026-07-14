import api from './api';

export const getChats = async () => {
  const { data } = await api.get("/chatbot");
  return data;
};

export const getChat = async (chatId) => {
  const { data } = await api.get(`/chatbot/${chatId}`);
  return data;
};

export const sendMessage = async ({ chatId, message }) => {
  const { data } = await api.post("/chatbot", {
    chatId,
    message,
  });

  return data;
};

export const deleteChat = async (chatId) => {
  const { data } = await api.delete(`/chatbot/${chatId}`);
  return data;
};