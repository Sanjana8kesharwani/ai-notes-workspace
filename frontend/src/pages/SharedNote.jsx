import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getSharedNote } from "../service/noteService";

function SharedNote() {
  const { shareId } = useParams();

  const [note, setNote] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH SHARED NOTE
  const fetchSharedNote = async () => {
    try {
      const data =
        await getSharedNote(shareId);

      setNote(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadSharedNote = async () => {
    await fetchSharedNote();
  };

  loadSharedNote();
}, [shareId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Shared Note Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl font-bold">
            {note.title}
          </h1>

          <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
            {note.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-gray-700 leading-9 text-lg mb-8">
          {note.content}
        </p>

        {note.summary && (
          <div className="bg-[#f5f7fb] p-6 rounded-2xl border">
            <h2 className="text-2xl font-bold mb-4">
              AI Summary
            </h2>

            <p className="text-gray-700 leading-8">
              {note.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SharedNote;