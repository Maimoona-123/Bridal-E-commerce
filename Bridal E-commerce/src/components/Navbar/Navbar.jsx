
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { products } from "../../data/Product";

const collections = [
  { name: "Bridal", desc: "Lehengas & gowns" },
  { name: "Walima", desc: "Soft & elegant looks" },
  { name: "Mehndi", desc: "Bright festive outfits" },
  { name: "Engagement", desc: "Graceful evening wear" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCollections, setMobileCollections] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-red-600 ${
      isActive ? "text-red-600" : "text-gray-800"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileCollections(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchOpen) {
      searchRef.current?.focus();
    }
  }, [searchOpen]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) =>
        [
          product.name,
          product.color,
          product.fabric,
          product.occasion,
        ].some((value) => String(value ?? "").toLowerCase().includes(query))
      )
      .slice(0, 8);
  }, [searchQuery]);

  const openProduct = (product) => {
    closeSearch();
    closeMenu();
    navigate(`/product/${product.id}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (filteredProducts.length > 0) {
      openProduct(filteredProducts[0]);
    } else if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-red-100 bg-amber-50/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-2xl text-gray-800 transition-colors hover:text-red-600 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"} />
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-7 text-sm font-medium uppercase tracking-wider md:flex">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>

          {/* Collections Dropdown */}
          <li className="group relative">
            <NavLink
              to="/shop"
              className={(state) =>
                `${linkClass(state)} flex items-center gap-1 py-5`
              }
            >
              Collections
              <i className="ri-arrow-down-s-line text-base transition-transform duration-300 group-hover:rotate-180" />
            </NavLink>

            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-60 rounded-xl border border-red-100 bg-white py-2 normal-case tracking-normal shadow-xl">
                {collections.map((collection) => (
                  <Link
                    key={collection.name}
                    to={`/shop?occasion=${encodeURIComponent(collection.name)}`}
                    className="block px-5 py-3 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="block text-sm font-medium">
                      {collection.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {collection.desc}
                    </span>
                  </Link>
                ))}

                <Link
                  to="/shop"
                  className="mt-1 flex items-center justify-between border-t border-red-100 px-5 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  View All Collections
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </li>

          <li>
            <NavLink to="/lookbook" className={linkClass}>
              LookBook
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            closeSearch();
          }}
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl font-extrabold uppercase tracking-[0.15em] text-gray-900 sm:text-2xl md:static md:translate-x-0 md:text-3xl md:tracking-[0.2em]"
          aria-label="Chiffon Home"
        >
          Nafas Bridal<span className="text-red-600">.</span>
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open);
              setSearchQuery("");
            }}
            className={`text-xl transition-colors hover:text-red-600 ${
              searchOpen ? "text-red-600" : "text-gray-800"
            }`}
            aria-label={searchOpen ? "Close search" : "Search dresses"}
            aria-expanded={searchOpen}
          >
            <i className={searchOpen ? "ri-close-line" : "ri-search-line"} />
          </button>

          <Link
            to="/favourites"
            onClick={() => {
              closeMenu();
              closeSearch();
            }}
            className="text-xl text-gray-800 transition-colors hover:text-red-600"
            aria-label="My Favourites"
            title="My Favourites"
          >
            <i className="ri-heart-line" />
          </Link>
        </div>
      </nav>

      {/* Search Panel */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-red-100 bg-amber-50 px-4 py-4 shadow-xl sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />

              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by dress name, color, fabric or occasion..."
                className="w-full rounded-xl border border-red-100 bg-white py-3 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                aria-label="Search dresses"
                autoComplete="off"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 hover:text-red-600"
                  aria-label="Clear search"
                >
                  <i className="ri-close-circle-line" />
                </button>
              )}
            </form>

            {searchQuery.trim() && (
              <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-red-100 bg-white shadow-sm">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => openProduct(product)}
                      className="flex w-full items-center gap-4 border-b border-gray-100 p-3 text-left transition-colors last:border-b-0 hover:bg-red-50"
                    >
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-amber-50">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xl text-red-300">
                            <i className="ri-t-shirt-line" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {[product.color, product.fabric, product.occasion]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                        <p className="mt-1 text-sm font-medium text-red-600">
                          Rs. {Number(product.price).toLocaleString()}
                        </p>
                      </div>

                      <i className="ri-arrow-right-line text-lg text-gray-400" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-7 text-center">
                    <i className="ri-search-eye-line text-3xl text-gray-300" />
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      No dresses found
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try another name, color, fabric or occasion.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!searchQuery.trim() && (
              <p className="mt-3 text-xs text-gray-500">
                Search dresses by name, color, fabric or occasion.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-red-100 bg-amber-50 px-6 py-4 text-sm uppercase tracking-wider md:hidden">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `block py-3 ${isActive ? "text-red-600" : "text-gray-800"}`
            }
          >
            Home
          </NavLink>

          {/* Mobile Collections */}
          <button
            type="button"
            onClick={() => setMobileCollections(!mobileCollections)}
            className="flex w-full items-center justify-between py-3 text-left text-gray-800"
            aria-expanded={mobileCollections}
          >
            Collections
            <i
              className={`ri-arrow-down-s-line text-lg transition-transform ${
                mobileCollections ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileCollections && (
            <div className="border-l border-red-200 pb-2 pl-4 normal-case tracking-normal text-gray-600">
              {collections.map((collection) => (
                <Link
                  key={collection.name}
                  to={`/shop?occasion=${encodeURIComponent(collection.name)}`}
                  onClick={closeMenu}
                  className="block py-2.5 transition-colors hover:text-red-600"
                >
                  {collection.name}
                </Link>
              ))}

              <Link
                to="/shop"
                onClick={closeMenu}
                className="block py-2.5 font-medium text-red-600"
              >
                View All Collections
              </Link>
            </div>
          )}

          <NavLink
            to="/lookbook"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block py-3 ${isActive ? "text-red-600" : "text-gray-800"}`
            }
          >
            LookBook
          </NavLink>

          <NavLink
            to="/tiktok-inspiration"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block py-3 ${isActive ? "text-red-600" : "text-gray-800"}`
            }
          >
            TikTok Inspiration
          </NavLink>

          <NavLink
            to="/favourites"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 ${
                isActive ? "text-red-600" : "text-gray-800"
              }`
            }
          >
            <i className="ri-heart-line text-lg" />
            My Favourites
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block py-3 ${isActive ? "text-red-600" : "text-gray-800"}`
            }
          >
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;