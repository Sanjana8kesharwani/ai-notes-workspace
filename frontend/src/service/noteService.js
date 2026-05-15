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

// UPDATE NOTE
export const updateNote = async (
  id,
  noteData
) => {
  const response = await api.put(
    `/notes/${id}`,
    noteData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// SHARE NOTE
export const shareNote = async (id) => {
  const response = await api.post(
    `/notes/${id}/share`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// GET SHARED NOTE
export const getSharedNote = async (
  shareId
) => {
  const response = await api.get(
    `/notes/shared/${shareId}`
  );

  return response.data;
};


// ARCHIVE NOTE
export const archiveNote = async (
  id
) => {
  const response = await api.patch(
    `/notes/${id}/archive`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};