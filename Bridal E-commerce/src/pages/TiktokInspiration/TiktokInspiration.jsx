
import React from "react";

const TIKTOK_PROFILE = "https://www.tiktok.com/@bridal175";

// Load local videos from src/assets/videos
const videoFiles = import.meta.glob("../../assets/videos/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

// Skip the first 3 videos and display only the next 6
const allVideos = Object.entries(videoFiles)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB));

const selectedVideos = allVideos.slice(3, 9);

const TikTokInspiration = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
        <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-16 h-56 w-56 rounded-full bg-red-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
            <i className="ri-tiktok-line text-lg" />
            Follow Our Style
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            TikTok{" "}
            <span className="text-red-600">Inspiration</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Discover beautiful bridal looks, elegant outfits, and fashion
            inspiration. Explore our collection and find a style for your
            special moments.
          </p>

          <a
            href={TIKTOK_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-red-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-700"
          >
            <i className="ri-tiktok-line text-xl" />
            Visit Our TikTok
            <i className="ri-arrow-up-right-line text-lg" />
          </a>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
                The Style Edit
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                Bridal Looks We Love
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              A little inspiration for your big day
            </p>
          </div>

          {selectedVideos.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selectedVideos.map(([path, video], index) => {
                const fileName = path
                  .split("/")
                  .pop()
                  .replace(/\.mp4$/i, "")
                  .replace(/[-_]/g, " ");

                return (
                  <a
                    key={path}
                    href={TIKTOK_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    aria-label={`Open TikTok profile for bridal inspiration ${index + 1}`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-amber-100">
                      <video
                        src={video}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                      <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-medium capitalize text-white backdrop-blur-sm">
                        Bridal Inspiration
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition group-hover:bg-red-600">
                          <i className="ri-play-fill text-2xl" />
                        </div>

                        <h3 className="text-lg font-semibold capitalize">
                          {fileName || `Bridal Look ${index + 1}`}
                        </h3>

                        <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
                          Explore on TikTok
                          <i className="ri-arrow-up-right-line" />
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-100 bg-white/80 px-6 py-14 text-center shadow-sm">
              <i className="ri-video-line text-5xl text-red-500" />

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No videos found
              </h3>

              <p className="mt-2 text-gray-600">
                Add at least six MP4 videos to your assets/videos folder.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                This page skips the first three videos, so nine videos are
                needed to show six after skipping.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 rounded-3xl border border-amber-100 bg-white/80 px-6 py-10 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <i className="ri-heart-3-line text-3xl" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
              Find Your Bridal Inspiration
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
              Visit our TikTok profile for more bridal fashion and styling
              inspiration.
            </p>

            <a
              href={TIKTOK_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <i className="ri-tiktok-line text-xl" />
              Explore TikTok
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TikTokInspiration;
