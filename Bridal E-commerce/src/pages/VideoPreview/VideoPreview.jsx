import React from "react";
import { Link } from "react-router-dom";

const videoFiles = import.meta.glob(
  "../../assets/videos/*.mp4",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const videos = Object.entries(videoFiles).map(([path, src]) => ({
  src,
  title: path
    .split("/")
    .pop()
    .replace(/\.mp4$/i, "")
    .replace(/[-_]/g, " "),
}));

const VideoPreview = () => {
  const previewVideos = videos.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-white px-5 py-16 text-gray-900 sm:px-8 md:py-24 lg:px-[6%]">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-200 opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-200 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-red-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-red-600">
              The Chiffon Experience
            </span>
            <span className="h-px w-10 bg-red-500" />
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Every Bride Deserves{" "}
            <span className="italic text-red-600">Magic</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600">
            Discover the details, elegance, and timeless beauty
            behind our bridal collection.
          </p>
        </div>

        {/* Bridal Video Cards */}
        {previewVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previewVideos.map((video, index) => (
              <article
                key={video.src}
                className={`group relative h-[390px] overflow-hidden rounded-2xl bg-amber-100 shadow-xl sm:h-[350px] lg:h-[430px] ${
                  index === 1 ? "lg:translate-y-6" : ""
                }`}
              >
                <video
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={video.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/20 via-transparent to-black/75 p-5 text-white">
                  <span className="self-end rounded-full border border-white/50 px-3 py-1 text-xs tracking-widest">
                    0{index + 1}
                  </span>

                  <div>
                    <i
                      className="ri-play-circle-line mb-3 block text-3xl"
                      aria-hidden="true"
                    />

                    <h3 className="mb-2 font-serif text-2xl font-medium capitalize">
                      {video.title}
                    </h3>

                    <span className="text-[9px] tracking-[2px]">
                      CHIFFON BRIDAL COLLECTION
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="relative py-10 text-center text-sm text-gray-600">
            No videos found. Add MP4 videos to the assets/videos folder.
          </p>
        )}

        {/* Footer and Gallery Button */}
        <div className="relative mt-14 flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <p className="font-serif text-base italic text-gray-600">
            Elegance in every detail. Beauty in every moment.
          </p>

          <Link
            to="/lookbook"
            className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-red-600 px-7 text-sm font-medium text-white shadow-lg transition duration-300 hover:bg-red-700 hover:shadow-xl"
          >
            Explore Video Gallery
            <i className="ri-arrow-right-line text-lg" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;