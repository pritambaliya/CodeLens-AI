import api from "./api";

export const getHistoryById = async (historyId) => {
  const { data } = await api.get(`/history/${historyId}`);
  return data;
};

export const getAllHistory = async () => {
    const { data } = await api.get("/history");
    return data;
};