import api from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

// GET NOTES
export const getNotes = async () => {
  const response = await api.get("/notes", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// CREATE NOTE
export const createNote = async (noteData) => {
  const response = await api.post(
    "/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// DELETE NOTE
export const deleteNote = async (id) => {
  const response = await api.delete(
    `/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};