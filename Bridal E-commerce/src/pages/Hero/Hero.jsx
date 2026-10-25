import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import mintGreen from '../../assets/banner/1_mint_green.png';
import mustardYellow from '../../assets/banner/2_mustard_yellow.png';
import powderBlue from '../../assets/banner/3_powder_blue.png';
import maroon from '../../assets/banner/4_maroon.png';
import blackGold from '../../assets/banner/5_black_gold.png';
import pink from '../../assets/banner/pink.jpg'

const slides = [
  { title: 'Mint Green', img: mintGreen, occasion: 'Valima' },
  { title: 'Mustard Yellow', img: mustardYellow, occasion: 'Mehndi' },
  { title: 'Powder Blue', img: powderBlue, occasion: 'Nikkah' },
  { title: 'Maroon', img: maroon, occasion: 'Bridal' },
  { title: 'Black & Gold', img: blackGold, occasion: 'Bridal' },
    { title: 'Pink', img: pink, occasion: 'Engagement' },
];

const arrowBtn =
  'absolute top-[calc(50%-1.5rem)] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl text-red-600 shadow-lg backdrop-blur transition hover:bg-red-600 hover:text-white md:grid';

const Banner = () => {
  return (
    <section
      className="bg-gradient-to-b from-amber-50 via-orange-50 to-white"
      style={{
        paddingTop: 'clamp(100px, 12vw, 40px)', // fixed navbar ke neeche gap
        paddingBottom: '16px',
        paddingLeft: 'clamp(16px, 4vw, 48px)',
        paddingRight: 'clamp(16px, 4vw, 48px)',
      }}
    >
      {/* dono side barabar gap */}
      <div
        className="relative"
        style={{ maxWidth: '1536px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        {/* Custom arrows (sirf desktop) */}
        <button className={`hero-prev left-3 ${arrowBtn}`} aria-label="Previous slide">
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button className={`hero-next right-3 ${arrowBtn}`} aria-label="Next slide">
          <i className="ri-arrow-right-s-line"></i>
        </button>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          centeredSlides
          grabCursor
          speed={800}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
          spaceBetween={16}
          slidesPerView={1.3}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          style={{
            '--swiper-theme-color': '#dc2626',
            '--swiper-pagination-bullet-inactive-color': '#fca5a5',
            '--swiper-pagination-bullet-inactive-opacity': '0.9',
            paddingTop: '16px',
            paddingBottom: '48px',
            paddingLeft: '4px',
            paddingRight: '4px',
          }}
          className="[&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:rounded-full"
        >
          {slides.map((s, i) => (
            <SwiperSlide
              key={s.title}
              className="scale-90 opacity-50 transition-all duration-500 [&.swiper-slide-active]:scale-100 [&.swiper-slide-active]:opacity-100"
            >
              <Link
                to={`/shop?occasion=${encodeURIComponent(s.occasion)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-lg shadow-red-200/60 ring-1 ring-red-100 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Sab images ek hi size (3:4) mein */}
                <img
                  src={s.img}
                  alt={`${s.title} collection`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="block h-full w-full object-cover object-top"
                />

                {/* Hover par neeche right mein arrow button */}
                <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white/90 text-xl text-red-600 opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:bg-red-600 group-hover:text-white group-hover:opacity-100">
                  <i className="ri-arrow-right-up-line"></i>
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;