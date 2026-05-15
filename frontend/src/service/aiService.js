import api from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const generateSummary = async (id) => {
  const response = await api.post(
    `/ai/${id}/summary`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};