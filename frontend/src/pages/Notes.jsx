import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  archiveNote,
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

  const [sortType, setSortType] =
    useState("latest");

  const [selectedTag, setSelectedTag] =
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

  // ARCHIVE NOTE

  const handleArchive = async (id) => {

    try {

      const data =
        await archiveNote(id);

      toast.success(data.message);

      fetchNotes();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to archive note"
      );

    }
  };

  // ALL TAGS

  const allTags = [
    ...new Set(
      notes.flatMap((note) => note.tags)
    ),
  ];

  // FILTER NOTES

  const filteredNotes = notes
    .filter((note) => !note.isArchived)
    .filter(
      (note) =>
        note.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        note.content
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        note.tags.some((tag) =>
          tag
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        )
    )
    .filter((note) =>
      selectedTag
        ? note.tags.includes(selectedTag)
        : true
    )
    .sort((a, b) => {

      if (sortType === "latest") {

        return (
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
        );

      }

      return (
        new Date(a.updatedAt) -
        new Date(b.updatedAt)
      );

    });

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-white">

      <Navbar />

      <div className="p-6 md:p-8">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-black to-gray-800 rounded-[30px] p-8 md:p-10 shadow-2xl mb-8 text-white relative overflow-hidden">

          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">

            <div>

              <p className="uppercase tracking-[3px] text-xs text-gray-300 mb-3">
                AI Powered Workspace
              </p>

              <h1 className="text-4xl md:text-5xl font-black mb-3">
                Notes Workspace 🚀
              </h1>

              <p className="text-gray-300 text-lg max-w-2xl">
                Organize your ideas smarter with AI generated summaries, tags, categories and productivity tracking.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[24px] px-8 py-6 min-w-[220px]">

              <h2 className="text-5xl font-black mb-2">
                {notes.length}
              </h2>

              <p className="text-gray-200">
                Total Notes
              </p>

            </div>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            editingId
              ? handleUpdate
              : handleCreateNote
          }
          className="bg-white p-6 rounded-[28px] shadow-lg mb-8 border border-gray-100 flex flex-col gap-5"
        >

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-black">
              {editingId
                ? "Update Note"
                : "Create New Note"}
            </h2>

            <div className="text-3xl">
              ✍️
            </div>

          </div>

          <input type="text" name="title" placeholder="Enter note title" value={formData.title} onChange={handleChange}
          className="bg-[#f8fafc] border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"/>

          <textarea name="content" placeholder="Enter note content" rows="5" value={formData.content} onChange={handleChange}
            className="bg-[#f8fafc] border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"/>


          <div className="grid md:grid-cols-2 gap-4">

            <input type="text" name="tags" placeholder="Tags separated by commas" value={formData.tags} onChange={handleChange}
              className="bg-[#f8fafc] border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"/>


            <input type="text" name="category" placeholder="Enter category" value={formData.category} onChange={handleChange}
              className="bg-[#f8fafc] border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"/>

          </div>

          <button className="bg-black text-white py-4 rounded-2xl hover:scale-[1.01] transition-all font-semibold shadow-lg">
            {editingId
              ? "Update Note"
              : "Create Note"}
          </button>

        </form>

        {/* SEARCH + FILTER */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input type="text" placeholder="Search notes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-md outline-none focus:ring-2 focus:ring-black"/>


          <select
            value={selectedTag}
            onChange={(e) =>
              setSelectedTag(
                e.target.value
              )
            }
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-md outline-none"
          >

            <option value="">
              Filter By Tag
            </option>

            {allTags.map((tag, index) => (

              <option
                key={index}
                value={tag}
              >
                {tag}
              </option>

            ))}

          </select>

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(
                e.target.value
              )
            }
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-md outline-none"
          >

            <option value="latest">
              Latest Notes
            </option>

            <option value="oldest">
              Oldest Notes
            </option>

          </select>

        </div>

        {/* NOTES */}

        {loading ? (

          <div className="bg-white p-10 rounded-3xl shadow-md text-center text-xl font-semibold">
            Loading notes...
          </div>

        ) : filteredNotes.length === 0 ? (

          <div className="bg-white p-12 rounded-3xl shadow-md text-center">

            <div className="text-6xl mb-5">
              📝
            </div>

            <h2 className="text-4xl font-black mb-4">
              No Notes Found
            </h2>

            <p className="text-gray-500 text-lg">
              Create your first AI powered note now 🚀
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredNotes.map((note) => (

              <div
                key={note._id}
                className="bg-white p-6 rounded-[28px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border border-gray-100"
              >

                <div className="flex items-start justify-between mb-4 gap-4">

                  <h2 className="text-2xl font-black line-clamp-2">
                    {note.title}
                  </h2>

                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    {note.category}
                  </span>

                </div>

                <p className="text-gray-600 mb-5 leading-7 line-clamp-4">
                  {note.content}
                </p>

                {/* TAGS */}

                <div className="flex flex-wrap gap-2 mb-5">

                  {note.tags.map(
                    (tag, index) => (

                      <span
                        key={index}
                        className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        #{tag}
                      </span>

                    )
                  )}

                </div>

                <p className="text-sm text-gray-400 mb-5">
                  Updated:
                  {" "}
                  {new Date(
                    note.updatedAt
                  ).toLocaleDateString()}
                </p>

                {note.summary && (

                  <div className="bg-gradient-to-r from-[#f8fafc] to-[#eef2ff] p-4 rounded-2xl mb-5 border border-gray-100">

                    <p className="text-sm font-bold mb-2">
                      🤖 AI Summary
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-4 leading-7">
                      {note.summary}
                    </p>

                  </div>

                )}

                <div className="grid grid-cols-2 gap-3">

                  <button
                    onClick={() =>
                      handleEdit(note)
                    }
                    className="bg-blue-500 text-white py-3 rounded-2xl hover:opacity-90 transition-all font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(note._id)
                    }
                    className="bg-red-500 text-white py-3 rounded-2xl hover:opacity-90 transition-all font-medium"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      handleGenerateSummary(
                        note._id
                      )
                    }
                    className="bg-black text-white py-3 rounded-2xl hover:opacity-90 transition-all font-medium"
                  >
                    AI Summary
                  </button>

                  <button
                    onClick={() =>
                      handleShare(note._id)
                    }
                    className="bg-green-500 text-white py-3 rounded-2xl hover:opacity-90 transition-all font-medium"
                  >
                    Share
                  </button>

                  <button
                    onClick={() =>
                      handleArchive(note._id)
                    }
                    className="col-span-2 bg-yellow-500 text-white py-3 rounded-2xl hover:opacity-90 transition-all font-medium"
                  >
                    Archive Note
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* AI SUMMARY MODAL */}

      {selectedSummary && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-5">

          <div className="bg-white w-full max-w-[700px] p-8 rounded-[32px] shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-4xl font-black mb-2">
                  AI Summary
                </h2>

                <p className="text-gray-500">
                  Smart AI generated insights
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedSummary("")
                }
                className="w-12 h-12 rounded-full bg-red-100 text-red-500 text-2xl hover:scale-110 transition-all"
              >
                ✕
              </button>

            </div>

            <div className="bg-[#f8fafc] p-6 rounded-3xl whitespace-pre-line text-gray-700 leading-8 border border-gray-100">
              {selectedSummary}
            </div>

          </div>

        </div>

      )}

    </div>
  );
}
export default Notes;