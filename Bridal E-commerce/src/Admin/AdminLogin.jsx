
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@chiffon.com" &&
      password === "ChangeMe123!"
    ) {
      localStorage.setItem("chiffon_admin_logged_in", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-gray-900">
          CHIFFON
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Admin Panel Login
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-amber-600"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#8b2635] text-white py-3 rounded-lg hover:bg-[#6e1d29] transition"
          >
            Login to Dashboard
          </button>

        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Chiffon Admin Management
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;
