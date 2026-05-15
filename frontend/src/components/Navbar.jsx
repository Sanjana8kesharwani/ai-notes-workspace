import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logout successful");

    navigate("/");
  };

  return (
    <div className="bg-white shadow-md px-10 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-black">
          AI Notes Workspace
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome {user?.name}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/dashboard")} className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 transition-all">
          Dashboard
        </button>

        <button onClick={() => navigate("/notes")} className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 transition-all">
          Notes
        </button>

        <button onClick={handleLogout} className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;