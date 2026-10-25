import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, WHATSAPP_NUMBER } from '../../data/Product';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <section className="grid min-h-screen place-items-center bg-amber-50 px-4 pt-28 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-serif text-3xl text-gray-900">Dress nahi mili</h1>
          <Link to="/shop" className="text-red-600 underline">
            Collections par wapas jao
          </Link>
        </div>
      </section>
    );
  }

  const toggleOption = (opt) =>
    setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));

  const message = [
    'Assalam o Alaikum! I would like to order this dress:',
    '',
    `Dress: ${product.name}`,
    `Collection: ${product.occasion}`,
    `Color: ${product.color}`,
    `Embroidery: ${product.embroidery}`,
    `Price: Rs. ${product.price.toLocaleString('en-PK')}`,
    `Customization: ${selected.length ? selected.join(', ') : 'None'}`,
    '',
  ].join('\n');

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white"
      style={{
        paddingTop: 'clamp(110px, 12vw, 130px)',
        paddingBottom: '80px',
        paddingLeft: 'clamp(16px, 5vw, 64px)',
        paddingRight: 'clamp(16px, 5vw, 64px)',
      }}
    >
      <div style={{ maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Link
          to={`/shop?occasion=${encodeURIComponent(product.occasion)}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-red-600"
        >
          <i className="ri-arrow-left-line"></i>
          Back to {product.occasion} Collection
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Image */}
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-red-100 ring-1 ring-red-100">
            <img src={product.image} alt={product.name} className="block w-full object-cover" />
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-red-600">
                {product.occasion}
              </span>
              <h1 className="font-serif text-4xl font-semibold leading-tight text-gray-900">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-red-600">
                Rs. {product.price.toLocaleString('en-PK')}
              </p>
            </div>

            <p className="leading-relaxed text-gray-600">{product.description}</p>

            {/* Specs */}
            <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-white p-5">
              <div className="flex items-start gap-3">
                <i className="ri-palette-line mt-0.5 text-xl text-red-500"></i>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Color</p>
                  <p className="text-gray-800">{product.color}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="ri-scissors-2-line mt-0.5 text-xl text-red-500"></i>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Embroidery</p>
                  <p className="text-gray-800">{product.embroidery}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="ri-vip-diamond-line mt-0.5 text-xl text-red-500"></i>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Fabric</p>
                  <p className="text-gray-800">{product.fabric}</p>
                </div>
              </div>
            </div>

            {/* Customization */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-900">
                Customization <span className="font-normal text-gray-500">(jo chahiye select karo)</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.customization.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleOption(opt)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selected.includes(opt)
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-red-200 bg-white text-gray-700 hover:border-red-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Order button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-600 text-base font-medium text-white shadow-lg transition hover:bg-red-700"
            >
              <i className="ri-whatsapp-line text-xl"></i>
              Order Now on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;