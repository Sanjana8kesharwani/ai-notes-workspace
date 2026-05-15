import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { signupUser } from "../service/authService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser(formData);

      console.log(data);

      toast.success("Signup successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5f7fb]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <input type="text" name="name" placeholder="Enter name" className="border p-3 rounded-lg outline-none" onChange={handleChange}/>
 
          <input type="email" name="email" placeholder="Enter email" className="border p-3 rounded-lg outline-none" onChange={handleChange}/>

          <input type="password" name="password" placeholder="Enter password" className="border p-3 rounded-lg outline-none" onChange={handleChange}/>
          
          <button className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition-all">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;