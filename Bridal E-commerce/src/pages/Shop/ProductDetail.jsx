
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { products, WHATSAPP_NUMBER } from "../../data/Product";
import useFavorites from "../../hooks/useFavorites";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selected, setSelected] = useState([]);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <section className="grid min-h-screen place-items-center bg-amber-50 px-4 pt-28 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-serif text-3xl text-gray-900">
            Dress nahi mili
          </h1>
          <Link to="/shop" className="text-red-600 underline">
            Collections par wapas jao
          </Link>
        </div>
      </section>
    );
  }

  const favorite = isFavorite(product.id);

  const toggleOption = (opt) =>
    setSelected((prev) =>
      prev.includes(opt)
        ? prev.filter((o) => o !== opt)
        : [...prev, opt]
    );

  const message = [
    "Assalam o Alaikum! I would like to order this dress:",
    "",
    `Dress: ${product.name}`,
    `Collection: ${product.occasion}`,
    `Color: ${product.color}`,
    `Fabric: ${product.fabric}`,
    `Embroidery: ${product.embroidery}`,
    `Price: Rs. ${product.price.toLocaleString("en-PK")}`,
    `Customization: ${selected.length ? selected.join(", ") : "None"}`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white px-4 pb-20 sm:px-8 lg:px-16"
      style={{ paddingTop: "clamp(110px, 12vw, 130px)" }}
    >
      <div className="mx-auto max-w-6xl">
        <Link
          to={`/shop?occasion=${encodeURIComponent(product.occasion)}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-red-600"
        >
          <i className="ri-arrow-left-line" />
          Back to {product.occasion} Collection
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Dress Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-red-100 ring-1 ring-red-100">
            <img
              src={product.image}
              alt={product.name}
              className="block w-full object-cover"
            />

            {/* Favourite Button */}
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={
                favorite
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
              aria-pressed={favorite}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-110"
            >
              <i
                className={`${
                  favorite
                    ? "ri-heart-fill text-red-600"
                    : "ri-heart-line text-gray-700"
                } text-2xl`}
              />
            </button>
          </div>

          {/* Dress Details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-red-600">
                {product.occasion}
              </span>

              <h1 className="font-serif text-4xl font-semibold leading-tight text-gray-900">
                {product.name}
              </h1>

              <p className="text-2xl font-semibold text-red-600">
                Rs. {product.price.toLocaleString("en-PK")}
              </p>
            </div>

            <p className="leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Product Specifications */}
            <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-white p-5">
              <div className="flex items-start gap-3">
                <i className="ri-palette-line mt-0.5 text-xl text-red-500" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Color
                  </p>
                  <p className="text-gray-800">{product.color}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="ri-scissors-2-line mt-0.5 text-xl text-red-500" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Embroidery
                  </p>
                  <p className="text-gray-800">{product.embroidery}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="ri-vip-diamond-line mt-0.5 text-xl text-red-500" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Fabric
                  </p>
                  <p className="text-gray-800">{product.fabric}</p>
                </div>
              </div>
            </div>

            {/* Customization */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-900">
                Customization{" "}
                <span className="font-normal text-gray-500">
                  (select what do you want)
                </span>
              </p>

              <div className="flex flex-wrap gap-3">
                {product.customization.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleOption(opt)}
                    aria-pressed={selected.includes(opt)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selected.includes(opt)
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-red-200 bg-white text-gray-700 hover:border-red-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp Order */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-600 text-base font-medium text-white shadow-lg transition hover:bg-red-700"
            >
              <i className="ri-whatsapp-line text-xl" />
              Order Now on WhatsApp
            </a>

            {/* Favourite Status */}
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-5 py-3 font-medium text-gray-700 transition hover:border-red-400 hover:text-red-600"
            >
              <i
                className={`${
                  favorite ? "ri-heart-fill text-red-600" : "ri-heart-line"
                } text-xl`}
              />
              {favorite ? "Saved to Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
