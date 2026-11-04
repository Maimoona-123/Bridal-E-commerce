
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Existing Components
import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero/Hero';
import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/Shop/ProductDetail';
import FeaturedCollection from './components/FeaturesCollection/FeaturesCollection';
import Lookbook from './components/LookBook/LookBook';
import VideoPreview from './pages/VideoPreview/VideoPreview';
import Feedback from './pages/Feedback/Feedback';
import TikTokInspiration from './pages/TiktokInspiration/TiktokInspiration';
import FAQ from './pages/FAQS/FAQS';
import Footer from './pages/Footer/Footer';
import Favourites from './pages/Favourites/Favourites';
import Contact from './pages/Contact/Contact';

// Admin Components
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import AdminProducts from './Admin/AdminProducts';

const App = () => {
  const location = useLocation();

  // Hide public navbar on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div>

      {!isAdminPage && <Navbar />}

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <FeaturedCollection />
              <VideoPreview />
              <Feedback />
              <TikTokInspiration />
              <FAQ />
              <Footer />
            </>
          }
        />

        {/* Public Routes */}
        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route path="/lookbook" element={<Lookbook />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

      </Routes>

    </div>
  );
};

export default App;
