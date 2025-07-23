import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    favoriteArtist: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      setError("Signup failed. Please check the input or try a different email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            name="favoriteArtist"
            placeholder="Favorite Artist"
            value={form.favoriteArtist}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-white text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
