import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-notes-workspace-rubh.onrender.com",
});

export default api;