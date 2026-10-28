
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import beigeVideo from '../../assets/videos/beige.mp4';
import blueGoldVideo from '../../assets/videos/bluegold.mp4';
import designerVideo from '../../assets/videos/desinger.mp4';
import goldenPurpleVideo from '../../assets/videos/goldenpruple.mp4';
import redGoldVideo from '../../assets/videos/redgold.mp4';
import redGoldenVideo from '../../assets/videos/redgolden.mp4';

const slides = [
  {
    title: 'Beige Designer Dress',
    video: beigeVideo,
    occasion: 'Bridal',
  },
  {
    title: 'Blue & Gold Designer Dress',
    video: blueGoldVideo,
    occasion: 'Bridal',
  },
  {
    title: 'Designer Dress',
    video: designerVideo,
    occasion: 'Bridal',
  },
  {
    title: 'Golden Purple Dress',
    video: goldenPurpleVideo,
    occasion: 'Bridal',
  },
  {
    title: 'Red & Gold Dress',
    video: redGoldVideo,
    occasion: 'Bridal',
  },
  {
    title: 'Red Golden Dress',
    video: redGoldenVideo,
    occasion: 'Bridal',
  },
];

const arrowBtn =
  'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl text-red-600 shadow-lg backdrop-blur transition hover:bg-red-600 hover:text-white md:grid';

const Banner = () => {
  return (
    <section
      className="bg-gradient-to-b from-amber-50 via-orange-50 to-white"
      style={{
        paddingTop: '120px',
        paddingBottom: '16px',
        paddingLeft: 'clamp(16px, 4vw, 48px)',
        paddingRight: 'clamp(16px, 4vw, 48px)',
      }}
    >
      <div
        className="relative mx-auto"
        style={{ maxWidth: '1536px' }}
      >
        <button
          className={`hero-prev left-3 ${arrowBtn}`}
          aria-label="Previous slide"
          type="button"
        >
          <i className="ri-arrow-left-s-line" />
        </button>

        <button
          className={`hero-next right-3 ${arrowBtn}`}
          aria-label="Next slide"
          type="button"
        >
          <i className="ri-arrow-right-s-line" />
        </button>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          centeredSlides
          grabCursor
          speed={800}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: '.hero-prev',
            nextEl: '.hero-next',
          }}
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
          {slides.map((s) => (
            <SwiperSlide
              key={s.title}
              className="scale-90 opacity-50 transition-all duration-500 [&.swiper-slide-active]:scale-100 [&.swiper-slide-active]:opacity-100"
            >
              <Link
                to={`/shop?occasion=${encodeURIComponent(s.occasion)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-lg shadow-red-200/60 ring-1 ring-red-100 transition-transform duration-300 hover:-translate-y-1"
              >
                <video
                  src={s.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="block h-full w-full object-cover object-top"
                />

                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-5 pt-12 text-center text-sm font-semibold tracking-wide text-white">
                  {s.title}
                </span>

                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl text-red-600 shadow-md transition group-hover:bg-red-600 group-hover:text-white">
                  <i className="ri-arrow-right-up-line" />
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
