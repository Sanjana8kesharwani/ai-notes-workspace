import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { loginUser } from "../service/authService";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response.data.message
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-white flex items-center justify-center p-6 overflow-hidden relative">

      {/* BACKGROUND BLUR */}

      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-indigo-300/30 rounded-full blur-3xl"></div>

      {/* LOGIN CARD */}

      <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-[36px] w-full max-w-[460px] p-8 md:p-10">

        {/* LOGO */}

        <div className="flex items-center justify-center mb-6">

          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-white text-4xl shadow-xl">
            ✨
          </div>

        </div>

        {/* TITLE */}

        <div className="text-center mb-8">

          <p className="uppercase tracking-[4px] text-xs text-gray-400 mb-3">
            AI Powered Workspace
          </p>

          <h1 className="text-5xl font-black mb-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 leading-7">
            Login to manage notes,
            generate AI summaries and
            organize your productivity.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          <div>

            <label className="text-sm font-semibold text-gray-600 block mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#f8fafc] border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            />

          </div>

          <div>

            <label className="text-sm font-semibold text-gray-600 block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#f8fafc] border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            />

          </div>

          <button className="bg-black text-white py-4 rounded-2xl hover:scale-[1.02] transition-all font-semibold shadow-xl mt-2">

            {loading
              ? "Please wait..."
              : "Login"}

          </button>

        </form>

        {/* FOOTER */}

        <div className="mt-8 text-center">

          <p className="text-gray-500">
            Don’t have an account?
            {" "}

            <span
              onClick={() =>
                navigate("/signup")
              }
              className="text-black font-bold cursor-pointer hover:underline"
            >
              Create Account
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;