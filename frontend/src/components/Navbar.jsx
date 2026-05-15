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

    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm px-6 md:px-12 py-5 flex items-center justify-between">

      {/* LOGO */}

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-white text-2xl shadow-lg">
          ✨
        </div>

        <div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black">
            AI Notes Workspace
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Welcome back, {user?.name} 👋
          </p>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#f5f7fb] hover:bg-black hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm">
          Dashboard
        </button>

        <button
          onClick={() => navigate("/notes")}
          className="bg-[#f5f7fb] hover:bg-black hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-sm">
          Notes
        </button>

        <button
          onClick={handleLogout}
          className="bg-black text-white hover:scale-105 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg">

          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;