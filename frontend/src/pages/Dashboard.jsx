import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <div className="p-10">
        <div className="bg-white rounded-3xl shadow-md p-10">
          <h1 className="text-5xl font-bold mb-5">
            Welcome {user?.name} 👋
          </h1>

          <p className="text-gray-500 text-lg">
            Manage your notes, organize ideas,
            and generate AI summaries instantly.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-[#f5f7fb] p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">
                Notes
              </h2>

              <p className="text-gray-500">
                Create and manage your notes.
              </p>
            </div>

            <div className="bg-[#f5f7fb] p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">
                AI Summary
              </h2>

              <p className="text-gray-500">
                Generate summaries with AI.
              </p>
            </div>

            <div className="bg-[#f5f7fb] p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">
                Secure Access
              </h2>

              <p className="text-gray-500">
                JWT protected authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;