
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("chiffon_admin_logged_in") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  // Save or Update Product
  const handleSave = async (productData) => {
    let updatedProducts;

    if (editingProduct) {
      updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...productData }
          : product
      );
    } else {
      const newProduct = {
        ...productData,
        id: `chiffon-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}`,
      };

      updatedProducts = [...products, newProduct];
    }

    const success = await setProducts(updatedProducts);

    if (!success) return;

    setShowForm(false);
    setEditingProduct(null);
  };

  // Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    const success = await setProducts(updatedProducts);

    if (!success) return;
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("chiffon_admin_logged_in");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2]">

      {/* Header */}
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

      <main className="max-w-7xl mx-auto p-6 md:p-10">

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">

          <div>
            <Link
              to="/admin/dashboard"
              className="text-[#8b2635] text-sm"
            >
              ← Back to Dashboard
            </Link>

            <h2 className="text-3xl font-bold mt-3">
              Manage Products
            </h2>

            <p className="text-gray-500 mt-2">
              Total Products: {products.length}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-[#8b2635] text-white px-6 py-3 rounded-lg"
          >
            + Add New Product
          </button>

        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Occasion</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">

                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.occasion}
                  </td>

                  <td className="p-4">
                    Rs. {Number(product.price).toLocaleString("en-PK")}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-10 text-gray-500"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </main>

      {/* Product Form */}
      {showForm && (
        <ProductForm
          initialProduct={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
};

export default AdminProducts;
