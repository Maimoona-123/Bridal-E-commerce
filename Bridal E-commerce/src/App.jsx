import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero/Hero';
import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/Shop/ProductDetail';
import FeaturedCollection from './components/FeaturesCollection/FeaturesCollection';
import Lookbook from './components/LookBook/LookBook';
import VideoPreview from './pages/VideoPreview/VideoPreview';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <FeaturedCollection />
              <VideoPreview/>
            </>
          }
        />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />
        <Route path="/lookbook" element={<Lookbook />} />
      </Routes>
    </div>
  );
};

export default App;
