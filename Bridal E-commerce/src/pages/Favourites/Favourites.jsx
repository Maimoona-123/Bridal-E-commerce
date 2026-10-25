
import React from "react";
import { Link } from "react-router-dom";
import useFavorites from "../../hooks/useFavorites";
import { products } from "../../data/Product";

const Favourites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const favouriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <i className="ri-heart-3-fill text-4xl text-red-600" />

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            My <span className="text-red-600">Favourites</span>
          </h1>

          <p className="mt-3 text-gray-600">
            Your favourite Chiffon dresses, all in one place.
          </p>
        </div>

        {favouriteProducts.length === 0 ? (
          <div className="rounded-3xl border border-amber-100 bg-white p-10 text-center shadow-sm">
            <i className="ri-heart-line text-5xl text-red-300" />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No favourites yet
            </h2>

            <p className="mt-2 text-gray-600">
              Tap the heart on any dress to save it here.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Explore Dresses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favouriteProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-amber-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={`Remove ${product.name} from favourites`}
                    className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
                  >
                    <i className="ri-heart-fill text-2xl text-red-600" />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-red-600">
                    {product.occasion}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 font-bold text-gray-900">
                    Rs. {product.price.toLocaleString("en-PK")}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 block rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700"
                  >
                    View Dress
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favourites;
