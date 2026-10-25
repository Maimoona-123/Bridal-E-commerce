import React from 'react';
import { Link } from 'react-router-dom';
import aboutVideo from '../../assets/videos/bridal.mp4';

const features = [
  {
    icon: 'ri-scissors-2-line',
    title: 'Handcrafted Detailing',
    text: 'Zardozi, dabka and hand embroidery on every piece.',
  },
  {
    icon: 'ri-ruler-2-line',
    title: 'Made to Fit You',
    text: 'Custom measurements so your outfit fits perfectly.',
  },
  {
    icon: 'ri-vip-diamond-line',
    title: 'Premium Fabrics',
    text: 'Velvet, net, organza and silk chosen for a rich finish.',
  },
];

const About = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-white"
      style={{
        paddingTop: 'clamp(80px, 18vw, 80px)', // navbar ke neeche gap
        paddingBottom: '100px',
        paddingLeft: 'clamp(16px, 5vw, 64px)',
        paddingRight: 'clamp(16px, 5vw, 64px)',
      }}
    >
      {/* Soft cream glow (sirf decoration) */}
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-amber-200 opacity-40 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-200 opacity-40 blur-3xl"></div>

      <div
        className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
        style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        {/* LEFT: Video */}
        <div
          className="relative w-full"
          style={{
            maxWidth: '540px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingRight: '20px',
            paddingBottom: '20px',
          }}
        >
          {/* Peeche red frame (video se thora bahar nikla hua) */}
          <div className="absolute inset-0 rounded-3xl border-2 border-red-300"></div>

          <video
            src={aboutVideo}
            autoPlay
            muted
            loop
            playsInline
            className="relative block h-[440px] w-full rounded-3xl object-cover shadow-2xl md:h-[580px]"
          />
        </div>

        {/* RIGHT: Text (spacing gap se, margin se nahi) */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-red-500"></span>
            <p className="text-xs font-medium uppercase tracking-widest text-red-600">
              About Chiffon
            </p>
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
            Where every bride feels like a{' '}
            <span className="italic text-red-600">queen</span>
          </h1>

          <div className="flex flex-col gap-4 leading-relaxed text-gray-600">
            <p>
              At Chiffon, we believe a wedding outfit is more than a dress, it is a memory you
              carry for life. From rich bridal lehengas to graceful nikkah and valima looks, every
              piece is designed with detailed embroidery, premium fabrics and a fit that feels made
              for you.
            </p>
            
          </div>

          {/* Features */}
          <div className="flex flex-col gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red-100 text-xl text-red-600">
                  <i className={f.icon}></i>
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-medium text-white shadow-lg transition hover:bg-red-700"
              style={{ padding: '0 28px' }}
            >
              Explore Collections
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-red-400 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
              style={{ padding: '0 28px' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;