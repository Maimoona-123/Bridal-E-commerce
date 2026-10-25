
import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../../data/Product';

const Shop = () => {
  const [params, setParams] = useSearchParams();

  const [color, setColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250000);

  const occasions = [
    'All',
    ...new Set(products.map((p) => p.occasion).filter(Boolean)),
  ];

  const colors = [
    'All',
    ...new Set(products.map((p) => p.color).filter(Boolean)),
  ];

  const active = params.get('occasion') || 'All';

  const list = useMemo(() => {
    return products.filter((p) => {
      const occasionMatch =
        active === 'All' || p.occasion === active;

      const colorMatch =
        color === 'All' || p.color === color;

      const priceMatch = (p.price ?? 0) <= maxPrice;

      return occasionMatch && colorMatch && priceMatch;
    });
  }, [active, color, maxPrice]);

  const pickOccasion = (occasion) => {
    if (occasion === 'All') {
      setParams({});
    } else {
      setParams({ occasion });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white px-4 pb-20 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-red-600">
            Explore Our Designs
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-gray-900 md:text-5xl">
            {active === 'All' ? 'All Collections' : `${active} Collection`}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {list.length} dresses found
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-red-100 bg-white p-5 shadow-sm md:sticky md:top-28">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">
                Filters
              </h2>

              <button
                onClick={() => {
                  setParams({});
                  setColor('All');
                  setMaxPrice(250000);
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="border-b border-gray-100 pb-5">
              <h3 className="mb-3 text-sm font-semibold">Occasion</h3>

              <div className="flex flex-wrap gap-2 md:flex-col">
                {occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => pickOccasion(o)}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                      active === o
                        ? 'bg-red-600 text-white'
                        : 'bg-amber-50 text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-100 py-5">
              <h3 className="mb-3 text-sm font-semibold">Color</h3>

              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-red-400"
              >
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-5">
              <div className="mb-3 flex justify-between gap-2">
                <h3 className="text-sm font-semibold">Maximum Price</h3>

                <span className="text-xs text-red-600">
                  Rs. {maxPrice.toLocaleString('en-PK')}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="250000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600"
              />

              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>Rs. 0</span>
                <span>Rs. 250,000</span>
              </div>
            </div>
          </aside>

          <div>
            {list.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center">
                <h2 className="font-serif text-2xl">
                  No dresses found
                </h2>

                <p className="mt-2 text-gray-500">
                  Try changing your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-red-100 transition hover:-translate-y-1 hover:shadow-xl"
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

                      <p className="mt-2 text-sm text-gray-500">
                        {p.color}
                      </p>

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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
