import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products = [] } = useProducts();

  const isLoggedIn =
    localStorage.getItem("chiffon_admin_logged_in") === "true";

  const handleLogout = () => {
    localStorage.removeItem("chiffon_admin_logged_in");
    navigate("/admin");
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: "ri-shopping-bag-line",
    },
    {
      title: "Bridal Collection",
      value: products.filter((p) => p.occasion === "Bridal").length,
      icon: "ri-heart-line",
    },
    {
      title: "Mehndi Collection",
      value: products.filter((p) => p.occasion === "Mehndi").length,
      icon: "ri-leaf-line",
    },
    {
      title: "Valima Collection",
      value: products.filter((p) => p.occasion === "Valima").length,
      icon: "ri-star-line",
    },
  ];

  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <header className="bg-white shadow-sm px-6 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#8b2635]">
          CHIFFON ADMIN
        </h1>

        <button
          onClick={handleLogout}
          className="bg-[#8b2635] text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-2">
            Manage your Chiffon bridal collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <i className={`${item.icon} text-3xl text-[#8b2635]`}></i>

              <h3 className="text-gray-500 mt-4">
                {item.title}
              </h3>

              <p className="text-3xl font-bold mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 mt-8 shadow-sm">
          <h3 className="text-xl font-bold mb-3">
            Product Management
          </h3>

          <p className="text-gray-500 mb-6">
            Add new dresses, update existing products and manage your collections.
          </p>

          <Link
            to="/admin/products"
            className="inline-block bg-[#8b2635] text-white px-6 py-3 rounded-lg hover:bg-[#6e1d29]"
          >
            Manage Products
          </Link>
        </div>

        <div className="mt-8">
          <Link to="/" className="text-[#8b2635] underline">
            Visit Public Website
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
