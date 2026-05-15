import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { loginUser } from "../service/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5f7fb]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <button className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition-all">
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;