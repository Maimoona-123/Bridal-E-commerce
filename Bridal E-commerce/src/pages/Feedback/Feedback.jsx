import React, { useState } from "react";

const feedbacks = [
  {
    name: "Ayesha Khan",
    location: "Karachi",
    initials: "AK",
    rating: 5,
    title: "Beautiful Bridal Outfit",
    message:
      "The embroidery details and overall design are absolutely gorgeous. The outfit inspiration is elegant and perfect for a special occasion.",
  },
  {
    name: "Fatima Ahmed",
    location: "Lahore",
    initials: "FA",
    rating: 5,
    title: "Elegant & Timeless",
    message:
      "I love the traditional designs and the beautiful color combinations. The collection feels graceful, luxurious, and full of charm.",
  },
  {
    name: "Zara Malik",
    location: "Islamabad",
    initials: "ZM",
    rating: 5,
    title: "Stunning Designs",
    message:
      "The bridal collection has such lovely details. I especially like the delicate embroidery and the elegant styling inspiration.",
  },
  {
    name: "Hira Siddiqui",
    location: "Hyderabad",
    initials: "HS",
    rating: 5,
    title: "A Dreamy Collection",
    message:
      "The designs are beautiful and sophisticated. I found so much inspiration for wedding events and formal occasions.",
  },
  {
    name: "Maham Ali",
    location: "Multan",
    initials: "MA",
    rating: 5,
    title: "Grace in Every Detail",
    message:
      "The rich colors and traditional style make this collection stand out. The presentation is lovely and the designs feel special.",
  },
];

const Feedback = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const previousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? feedbacks.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === feedbacks.length - 1 ? 0 : current + 1
    );
  };

  const visibleFeedbacks = [0, 1, 2].map(
    (offset) => feedbacks[(activeIndex + offset) % feedbacks.length]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-white px-5 py-20 sm:px-8 md:py-24 lg:px-[6%]">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-200 opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-200 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-red-500" />
            <span className="text-xs font-medium uppercase tracking-[3px] text-red-600">
              Kind Words
            </span>
            <span className="h-px w-10 bg-red-500" />
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Love Notes from Our{" "}
            <span className="italic text-red-600">Community</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600">
            Discover what people love about the elegance and beauty of Chiffon.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">5.0</span>
            <div className="text-sm text-red-600" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <span className="text-xs text-gray-500">Demo rating</span>
          </div>
        </div>

        {/* Slider Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleFeedbacks.map((feedback, index) => (
            <article
              key={`${feedback.name}-${activeIndex}`}
              className={`flex min-h-[330px] flex-col rounded-2xl border border-red-100 bg-white/80 p-7 shadow-lg shadow-red-950/5 transition-all duration-500 ${
                index === 1 ? "lg:-translate-y-3 lg:shadow-xl" : ""
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-1 text-lg text-red-600">
                  {Array.from({ length: feedback.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <i
                  className="ri-double-quotes-r text-3xl text-red-200"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                {feedback.title}
              </h3>

              <p className="flex-1 text-sm leading-7 text-gray-600">
                “{feedback.message}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-red-100 pt-5">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-red-100 font-serif text-sm font-semibold text-red-700">
                  {feedback.initials}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {feedback.name}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500">
                    {feedback.location}
                  </p>
                  <span className="mt-1 inline-block text-[10px] font-medium uppercase tracking-wider text-red-600">
                    Sample testimonial
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous feedback"
            className="grid h-12 w-12 place-items-center rounded-full border border-red-200 bg-white text-xl text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            <i className="ri-arrow-left-line" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {feedbacks.map((feedback, index) => (
              <button
                type="button"
                key={feedback.name}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-red-600"
                    : "w-2.5 bg-red-200 hover:bg-red-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next feedback"
            className="grid h-12 w-12 place-items-center rounded-full bg-red-600 text-xl text-white shadow-lg transition hover:bg-red-700"
          >
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          Sample testimonials for design preview — not verified customer reviews.
        </p>
      </div>
    </section>
  );
};

export default Feedback;