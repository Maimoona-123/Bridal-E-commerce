
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/Product';

const FeaturedCollection = () => {
  const featured = products.slice(0, 6);

  return (
    <section className="bg-amber-50 px-4 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-red-600">
            Curated for You
          </p>

          <h2 className="font-serif text-3xl font-semibold text-gray-900 md:text-5xl">
            Featured Collection
          </h2>

          <p className="mt-3 text-gray-600">
            Discover our handpicked designer outfits.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/5] overflow-hidden bg-orange-100">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-red-600">
                  {p.occasion}
                </p>

                <h3 className="mt-2 font-serif text-xl text-gray-900">
                  {p.name}
                </h3>

                <p className="mt-3 font-semibold text-gray-900">
                  Rs. {(p.price ?? 0).toLocaleString('en-PK')}
                </p>

                <p className="mt-3 text-sm text-red-600">
                  View Details →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-red-700"
          >
            See More Collections →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
