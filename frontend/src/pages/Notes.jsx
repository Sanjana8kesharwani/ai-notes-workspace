import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  shareNote,
} from "../service/noteService";

import { generateSummary } from "../service/aiService";

function Notes() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [selectedSummary, setSelectedSummary] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      setLoading(true);

      const data = await getNotes();

      setNotes(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

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
      await createNote({
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim()),
      });

      toast.success("Note created");

      setFormData({
        title: "",
        content: "",
        tags: "",
        category: "",
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

  // EDIT NOTE
  const handleEdit = (note) => {
    setEditingId(note._id);

    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      category: note.category,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE NOTE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateNote(editingId, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim()),
      });

      toast.success("Note updated");

      setEditingId(null);

      setFormData({
        title: "",
        content: "",
        tags: "",
        category: "",
      });

      fetchNotes();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update note");
    }
  };

  // AI SUMMARY
  const handleGenerateSummary = async (
    id
  ) => {
    try {
      const data = await generateSummary(id);

      toast.success("AI Summary Generated");

      setSelectedSummary(data.summary);

      fetchNotes();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to generate summary"
      );
    }
  };

  // SHARE NOTE
  const handleShare = async (id) => {
    try {
      const data = await shareNote(id);

      navigator.clipboard.writeText(
        data.shareLink
      );

      toast.success(
        "Share link copied"
      );
    } catch (error) {
      console.log(error);

      toast.error("Failed to share");
    }
  };

  // FILTER NOTES
  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      )
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <div className="p-10">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Notes Workspace
            </h1>

            <p className="text-gray-500 mt-2">
              Organize your ideas smarter 🚀
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl px-6 py-4">
            <h2 className="text-2xl font-bold">
              {notes.length}
            </h2>

            <p className="text-gray-500">
              Total Notes
            </p>
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={
            editingId
              ? handleUpdate
              : handleCreateNote
          }
          className="bg-white p-6 rounded-3xl shadow-md mb-10 flex flex-col gap-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter note title"
            value={formData.title}
            onChange={handleChange}
            className="border p-4 rounded-xl outline-none"
          />

          <textarea
            name="content"
            placeholder="Enter note content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            className="border p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            name="tags"
            placeholder="Enter tags separated by commas"
            value={formData.tags}
            onChange={handleChange}
            className="border p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            className="border p-4 rounded-xl outline-none"
          />

          <button className="bg-black text-white py-4 rounded-xl hover:opacity-90 transition-all font-semibold">
            {editingId
              ? "Update Note"
              : "Create Note"}
          </button>
        </form>

        {/* SEARCH */}

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full bg-white p-5 rounded-2xl shadow-md outline-none"
          />
        </div>

        {/* NOTES */}

        {loading ? (
          <div className="text-center text-xl font-semibold">
            Loading notes...
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-md text-center">
            <h2 className="text-3xl font-bold mb-3">
              No Notes Found
            </h2>

            <p className="text-gray-500">
              Create your first note now 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    {note.title}
                  </h2>

                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    {note.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-5 leading-7">
                  {note.content}
                </p>

                {/* TAGS */}

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-5">
                  Created:
                  {" "}
                  {new Date(
                    note.createdAt
                  ).toLocaleDateString()}
                </p>

                {note.summary && (
                  <div className="bg-[#f5f7fb] p-4 rounded-2xl mb-5 border">
                    <p className="text-sm font-medium mb-2">
                      AI Summary
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-4">
                      {note.summary}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      handleEdit(note)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(note._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      handleGenerateSummary(
                        note._id
                      )
                    }
                    className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                  >
                    AI Summary
                  </button>

                  <button
                    onClick={() =>
                      handleShare(note._id)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI SUMMARY MODAL */}

      {selectedSummary && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-[700px] p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                AI Summary
              </h2>

              <button onClick={() => setSelectedSummary("")} className="text-red-500 text-3xl">
                ✕
              </button>
            </div>

            <div className="bg-[#f5f7fb] p-6 rounded-2xl whitespace-pre-line text-gray-700 leading-8">
              {selectedSummary}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;