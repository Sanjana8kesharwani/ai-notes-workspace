import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
  createNote,
  deleteNote,
  getNotes,
} from "../service/noteService";

function Notes() {
  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      const data = await getNotes();

      setNotes(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch notes");
    }
  };

  // LOAD NOTES
  useEffect(() => {
    const loadNotes = async () => {
      await fetchNotes();
    };

    loadNotes();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE NOTE
  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      await createNote(formData);

      toast.success("Note created");

      setFormData({
        title: "",
        content: "",
      });

      fetchNotes();
    } catch (error) {
      console.log(error);

      toast.error("Failed to create note");
    }
  };

  // DELETE NOTE
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      toast.success("Note deleted");

      fetchNotes();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">
          Notes Workspace
        </h1>

        {/* CREATE NOTE FORM */}

        <form
          onSubmit={handleCreateNote}
          className="bg-white p-6 rounded-2xl shadow-md mb-10 flex flex-col gap-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter note title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none"
          />

          <textarea
            name="content"
            placeholder="Enter note content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none"
          />

          <button className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition-all">
            Create Note
          </button>
        </form>

        {/* NOTES */}

        <div className="grid md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-5 rounded-2xl shadow-md"
            >
              <h2 className="text-2xl font-bold mb-3">
                {note.title}
              </h2>

              <p className="text-gray-600 mb-5">
                {note.content}
              </p>

              <button
                onClick={() =>
                  handleDelete(note._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;