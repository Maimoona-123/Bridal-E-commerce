
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Collections", path: "/collections" },
    { name: "Lookbook", path: "/lookbook" },
    { name: "TikTok Inspiration", path: "/tiktok-inspiration" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
  ];

  const collections = [
    "Bridal Wear",
    "Luxury Dresses",
    "Wedding Collection",
    "Elegant Styles",
  ];

  return (
    <footer className="relative overflow-hidden border-t border-amber-100 bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-red-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-14 sm:px-8 sm:pt-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 border-b border-amber-200/70 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-bold tracking-[0.12em] text-gray-900">
                CHIFFON<span className="text-red-600">.</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-600">
              Discover elegant bridal fashion, timeless designs, and
              beautiful styles for your most special moments.
            </p>

            <a
              href="https://www.tiktok.com/@bridal175"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Chiffon on TikTok"
              className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-white text-xl text-gray-800 transition hover:border-red-200 hover:bg-red-600 hover:text-white"
            >
              <i className="ri-tiktok-line" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex w-fit items-center gap-2 text-sm text-gray-600 transition hover:text-red-600"
                >
                  <i className="ri-arrow-right-s-line text-red-500 transition group-hover:translate-x-1" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Our Collections
            </h3>

            <div className="mt-5 space-y-3">
              {collections.map((item) => (
                <Link
                  key={item}
                  to="/collections"
                  className="group flex w-fit items-center gap-2 text-sm text-gray-600 transition hover:text-red-600"
                >
                  <i className="ri-sparkling-2-line text-amber-600" />
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Brand Message */}
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Made for Your Moments
            </h3>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              Every celebration deserves a special look. Explore our
              bridal inspiration and discover a style that feels like you.
            </p>

            <Link
              to="/tiktok-inspiration"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Explore Inspiration
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} Chiffon. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 sm:text-sm">
            Elegance in Every Detail
            <span className="mx-2 text-red-500">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
