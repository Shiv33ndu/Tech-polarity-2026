"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://tech-polarity-backend.onrender.com/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Swagger shows response is plain string
      const token: string = res.data;

      if (!token) {
        throw new Error("No token received");
      }

      // Store token
      localStorage.setItem("adminToken", token);

      // OPTIONAL (better for middleware)
      document.cookie = `adminToken=${token}; path=/`;

      // Redirect
      router.push("/admin/dashboard");

    } catch (err: any) {
      console.error("Login Error:", err);

      // Handle 422 validation error (from Swagger)
      if (err.response?.status === 422) {
        setError("Validation error: check email/password format ❌");
      } else if (err.response?.status === 401) {
        setError("Invalid credentials ❌");
      } else {
        setError("Something went wrong. Try again ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            className="w-full mb-4 p-3 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full mb-4 p-3 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}