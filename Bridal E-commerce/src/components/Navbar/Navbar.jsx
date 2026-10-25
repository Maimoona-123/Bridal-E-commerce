import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const collections = [
  { name: 'Bridal', desc: 'Lehengas & gowns' },
  { name: 'Walima', desc: 'Soft & elegant looks' },
  { name: 'Mehndi', desc: 'Bright festive outfits' },
  { name: 'Engagement', desc: 'Graceful evening wear' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCollections, setMobileCollections] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-red-600 ${
      isActive ? 'text-red-600' : 'text-gray-800'
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileCollections(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-red-100 bg-amber-50/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8">

        {/* Mobile menu button */}
        <button
          type="button"
          className="text-2xl text-gray-800 transition-colors hover:text-red-600 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} />
        </button>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-7 text-sm font-medium uppercase tracking-wider md:flex">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>

          {/* Collections dropdown */}
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
              <div className="w-60 rounded-xl border border-red-100 bg-white py-2 shadow-xl normal-case tracking-normal">
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

        {/* Brand logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl font-extrabold uppercase tracking-[0.15em] text-gray-900 sm:text-2xl md:static md:translate-x-0 md:text-3xl md:tracking-[0.2em]"
          aria-label="Chiffon Home"
        >
          Chiffon<span className="text-red-600">.</span>
        </Link>

        {/* Right side icons */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link
            to="/search"
            className="text-xl text-gray-800 transition-colors hover:text-red-600"
            aria-label="Search"
          >
            <i className="ri-search-line" />
          </Link>

          <Link
            to="/wishlist"
            className="text-xl text-gray-800 transition-colors hover:text-red-600"
            aria-label="Wishlist"
          >
            <i className="ri-heart-line" />
          </Link>
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-red-100 bg-amber-50 px-6 py-4 text-sm uppercase tracking-wider md:hidden">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `block py-3 ${isActive ? 'text-red-600' : 'text-gray-800'}`
            }
          >
            Home
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileCollections(!mobileCollections)}
            className="flex w-full items-center justify-between py-3 text-left"
            aria-expanded={mobileCollections}
          >
            Collections
            <i
              className={`ri-arrow-down-s-line text-lg transition-transform ${
                mobileCollections ? 'rotate-180' : ''
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
              `block py-3 ${isActive ? 'text-red-600' : 'text-gray-800'}`
            }
          >
            Video Gallery
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block py-3 ${isActive ? 'text-red-600' : 'text-gray-800'}`
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
