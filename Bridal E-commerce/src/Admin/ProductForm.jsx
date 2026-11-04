
import React, { useEffect, useState } from "react";

const ProductForm = ({ initialProduct, onSave, onCancel }) => {

  const [formData, setFormData] = useState({
    name: "",
    occasion: "Bridal",
    price: "",
    color: "",
    fabric: "Sheesha Silk",
    embroidery: "Hand Embroidery",
    description: "",
    image: "",
    video: "",
  });

  const [saving, setSaving] = useState(false);

  // Load Existing Product
  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        price: String(initialProduct.price || ""),
        image: initialProduct.image || "",
        video: initialProduct.video || "",
      });
    } else {
      setFormData({
        name: "",
        occasion: "Bridal",
        price: "",
        color: "",
        fabric: "Sheesha Silk",
        embroidery: "Hand Embroidery",
        description: "",
        image: "",
        video: "",
      });
    }
  }, [initialProduct]);

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.onerror = () => {
      alert("Unable to read image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  // Video Upload
  const handleVideo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload MP4, WebM or MOV video.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        video: reader.result,
      }));
    };

    reader.onerror = () => {
      alert("Unable to read video. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  // Remove Image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Remove Video
  const removeVideo = () => {
    setFormData((prev) => ({
      ...prev,
      video: "",
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!formData.image) {
      alert("Please upload a product image.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!formData.price || Number(formData.price) < 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      setSaving(true);

      const result = await onSave({
        ...formData,
        name: formData.name.trim(),
        price: Number(formData.price),
        customization: initialProduct?.customization || [
          "Color change",
          "Size & length",
          "Sleeve style",
          "Dupatta style",
        ],
      });

      if (result === false) {
        return;
      }

      // Form closes through AdminProducts after successful save

    } catch (error) {
      console.error("Form Submit Error:", error);
      alert("Unable to save product. Please try again.");

    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8b2635]";

  return (

    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6 my-auto max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">
          {initialProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Product Name */}
          <div>

            <label className="block mb-2 font-medium">
              Product Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter dress name"
              required
            />

          </div>

          {/* Occasion and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 font-medium">
                Occasion
              </label>

              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Bridal</option>
                <option>Walima</option>
                <option>Mehndi</option>
                <option>Engagement</option>
                <option>Party Wear</option>
                <option>Formal</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Price (PKR)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={inputClass}
                placeholder="25000"
                min="0"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Color
              </label>

              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={inputClass}
                placeholder="Maroon"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Fabric
              </label>

              <input
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                className={inputClass}
                required
              />

            </div>

          </div>

          {/* Embroidery */}
          <div>

            <label className="block mb-2 font-medium">
              Embroidery
            </label>

            <input
              name="embroidery"
              value={formData.embroidery}
              onChange={handleChange}
              className={inputClass}
              required
            />

          </div>

          {/* Description */}
          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              rows="4"
              placeholder="Describe the dress..."
              required
            />

          </div>

          {/* Image Upload */}
          <div className="border rounded-xl p-4">

            <label className="block mb-3 font-semibold">
              Product Image *
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-xs text-gray-500 mt-2">
              Upload a high-quality product image.
            </p>

            {formData.image && (

              <div className="mt-4 relative w-36">

                <img
                  src={formData.image}
                  alt="Product preview"
                  className="w-36 h-44 object-cover rounded-lg border"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7"
                >
                  ×
                </button>

              </div>

            )}

          </div>

          {/* Video Upload */}
          <div className="border rounded-xl p-4">

            <label className="block mb-3 font-semibold">
              Product Video (Optional)
            </label>

            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideo}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-xs text-gray-500 mt-2">
              Supported formats: MP4, WebM, MOV.
            </p>

            {formData.video && (

              <div className="mt-4">

                <video
                  src={formData.video}
                  controls
                  playsInline
                  className="w-full max-h-64 rounded-lg bg-black"
                />

                <button
                  type="button"
                  onClick={removeVideo}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Remove Video
                </button>

              </div>

            )}

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#8b2635] text-white py-3 rounded-lg hover:bg-[#701d2a] disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : initialProduct
                ? "Update Product"
                : "Save Product"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;
