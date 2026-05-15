import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getNotes } from "../service/noteService";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [notes, setNotes] = useState([]);

  const fetchDashboardData = async () => {

    try {

      const data = await getNotes();

      setNotes(data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    const loadDashboardData =
      async () => {

        await fetchDashboardData();

      };

    loadDashboardData();

  }, []);

  // TOTAL NOTES

  const totalNotes = notes.length;

  // ARCHIVED NOTES

  const archivedNotes = notes.filter(
    (note) => note.isArchived
  ).length;

  // AI GENERATED NOTES

  const aiNotes = notes.filter(
    (note) => note.summary
  ).length;

  // RECENT NOTES

  const recentNotes = [...notes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
    )
    .slice(0, 3);

  // MOST USED TAGS

  const tagCounts = {};

  notes.forEach((note) => {

    note.tags.forEach((tag) => {

      tagCounts[tag] =
        (tagCounts[tag] || 0) + 1;

    });

  });

  const mostUsedTags = Object.entries(
    tagCounts
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // WEEKLY ACTIVITY

  const weeklyNotes = notes.filter(
    (note) => {

      const createdDate = new Date(
        note.createdAt
      );

      const now = new Date();

      const diff =
        (now - createdDate) /
        (1000 * 60 * 60 * 24);

      return diff <= 7;

    }
  ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#ffffff]">

      <Navbar />

      <div className="p-6 md:p-8">

        {/* HERO SECTION */}

        <div className="relative overflow-hidden bg-gradient-to-r from-black to-gray-800 rounded-[28px] p-8 md:p-10 shadow-xl mb-8 text-white">

          <div className="absolute top-0 right-0 w-[220px] h-[220px] bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <p className="uppercase tracking-[3px] text-xs text-gray-300 mb-3">
              AI Powered Workspace
            </p>

            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Welcome {user?.name} 👋
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-8">
              Manage notes, organize ideas,
              track productivity, and
              generate AI summaries in one
              smart workspace.
            </p>

            <button
              onClick={() =>
                navigate("/notes")
              }
              className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Open Notes →
            </button>

          </div>

        </div>

        {/* STATS CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-[24px] shadow-md hover:-translate-y-1 transition-all border border-gray-100">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                📝
              </div>

              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">
                Notes
              </span>

            </div>

            <h2 className="text-4xl font-black mb-2">
              {totalNotes}
            </h2>

            <p className="text-gray-500">
              Total Notes
            </p>

          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-md hover:-translate-y-1 transition-all border border-gray-100">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                🤖
              </div>

              <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold">
                AI
              </span>

            </div>

            <h2 className="text-4xl font-black mb-2">
              {aiNotes}
            </h2>

            <p className="text-gray-500">
              AI Summaries
            </p>

          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-md hover:-translate-y-1 transition-all border border-gray-100">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-2xl">
                📦
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-semibold">
                Archive
              </span>

            </div>

            <h2 className="text-4xl font-black mb-2">
              {archivedNotes}
            </h2>

            <p className="text-gray-500">
              Archived Notes
            </p>

          </div>

        </div>

        {/* RECENT + TAGS */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* RECENT NOTES */}

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-gray-100">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black">
                Recently Edited
              </h2>

            </div>

            <div className="flex flex-col gap-4">

              {recentNotes.length > 0 ? (

                recentNotes.map((note) => (

                  <div
                    key={note._id}
                    className="bg-[#f8fafc] p-4 rounded-2xl hover:bg-[#eef2ff] transition-all"
                  >

                    <div className="flex items-center justify-between mb-2">

                      <h3 className="text-lg font-bold">
                        {note.title}
                      </h3>

                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                        {note.category}
                      </span>

                    </div>

                    <p className="text-gray-500 text-sm">
                      Updated:
                      {" "}
                      {new Date(
                        note.updatedAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                ))

              ) : (

                <div className="bg-[#f8fafc] p-8 rounded-2xl text-center">

                  <p className="text-gray-500">
                    No recent notes found
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* MOST USED TAGS */}

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-gray-100">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black">
                Most Used Tags
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              {mostUsedTags.length > 0 ? (

                mostUsedTags.map(
                  ([tag, count], index) => (

                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-sm text-sm"
                    >
                      #{tag} ({count})
                    </div>

                  )
                )

              ) : (

                <div className="bg-[#f8fafc] p-8 rounded-2xl w-full text-center">

                  <p className="text-gray-500">
                    No tags available
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* WEEKLY SUMMARY */}

        <div className="bg-white rounded-[24px] shadow-md p-7 border border-gray-100">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-black mb-2">
                Weekly Activity
              </h2>

              <p className="text-gray-500">
                Productivity insights this week
              </p>

            </div>

            <div className="text-4xl">
              📊
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gradient-to-br from-black to-gray-800 text-white p-6 rounded-[24px] shadow-lg">

              <h3 className="text-4xl font-black mb-3">
                {weeklyNotes}
              </h3>

              <p className="text-gray-300">
                Notes This Week
              </p>

            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-[24px] shadow-lg">

              <h3 className="text-4xl font-black mb-3">
                {
                  mostUsedTags.length
                }
              </h3>

              <p className="text-blue-100">
                Active Tags
              </p>

            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-[24px] shadow-lg">

              <h3 className="text-4xl font-black mb-3">
                {aiNotes}
              </h3>

              <p className="text-green-100">
                AI Usage
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;