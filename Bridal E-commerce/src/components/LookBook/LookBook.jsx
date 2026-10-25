
import React, { useState, useEffect } from 'react';

const videoFiles = import.meta.glob('../../assets/videos/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
});

const videos = Object.entries(videoFiles)
  .map(([path, src], index) => {
    const filename = path.split('/').pop().replace(/\.mp4$/i, '');

    return {
      id: index,
      src,
      title: filename
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const cardSizes = [
  'md:col-span-2 md:row-span-2',
  'md:row-span-2',
  'md:row-span-2',
  'md:row-span-3',
  'md:row-span-2',
  'md:col-span-2 md:row-span-2',
  'md:row-span-3',
  'md:row-span-2',
];

export default function Lookbook() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('favoriteVideos') || '[]'
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favoriteVideos', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const displayedVideos = showFavorites
    ? videos.filter((video) => favorites.includes(video.id))
    : videos;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] pb-16 pt-28 text-[#30231f] sm:pt-32">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">

        {/* Gallery heading */}
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-red-700 sm:text-xs sm:tracking-[0.4em]">
            The Bridal Film Collection
          </p>

          <h1 className="font-serif text-3xl leading-tight sm:text-5xl md:text-6xl">
            A Closer Look at{' '}
            <span className="italic text-red-700">Elegance</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
            Discover the details, craftsmanship and timeless beauty
            behind our bridal outfits.
          </p>

          <div className="mx-auto mt-5 h-px w-16 bg-red-300 sm:mt-6 sm:w-20" />
        </div>

        {/* Gallery controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            {showFavorites ? 'Your Favourite Videos' : 'Explore Our Videos'}
          </p>

          <button
            type="button"
            onClick={() => setShowFavorites((previous) => !previous)}
            aria-pressed={showFavorites}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
              showFavorites
                ? 'border-red-600 bg-red-600 text-white'
                : 'border-red-200 bg-white text-gray-800 hover:border-red-500 hover:text-red-600'
            }`}
          >
            <i
              className={
                showFavorites ? 'ri-heart-fill' : 'ri-heart-line'
              }
            />
            {showFavorites ? 'All Videos' : 'Favourites'}
            <span>({favorites.length})</span>
          </button>
        </div>

        {/* Responsive video gallery */}
        {displayedVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 md:auto-rows-[150px] md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {displayedVideos.map((video, index) => {
              const isFavorite = favorites.includes(video.id);

              return (
                <article
                  key={video.id}
                  className={`group relative isolate h-[380px] overflow-hidden rounded-xl bg-[#eaded5] shadow-sm sm:h-[420px] md:h-auto ${
                    !showFavorites
                      ? cardSizes[index % cardSizes.length]
                      : ''
                  }`}
                >
                  <video
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={video.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Favourite button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(video.id)}
                    aria-label={
                      isFavorite
                        ? 'Remove from favourites'
                        : 'Add to favourites'
                    }
                    aria-pressed={isFavorite}
                    title={
                      isFavorite
                        ? 'Remove from favourites'
                        : 'Add to favourites'
                    }
                    className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-xl shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
                  >
                    <i
                      className={
                        isFavorite
                          ? 'ri-heart-fill text-red-600'
                          : 'ri-heart-line text-gray-800'
                      }
                    />
                  </button>

                  {/* Video title */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-5 pt-16 sm:px-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                      Bridal Edit {String(index + 1).padStart(2, '0')}
                    </p>

                    <h2 className="mt-1 break-words font-serif text-xl text-white sm:text-2xl">
                      {video.title}
                    </h2>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-red-100 bg-white px-4 py-16 text-center">
            <i className="ri-heart-line text-4xl text-red-300" />

            <p className="mt-4 font-serif text-2xl">
              {showFavorites
                ? 'No favourites yet'
                : 'Our collection is coming soon'}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              {showFavorites
                ? 'Tap the heart on any video to save it here.'
                : 'Check that your MP4 videos are inside src/assets/videos.'}
            </p>

            {showFavorites && (
              <button
                type="button"
                onClick={() => setShowFavorites(false)}
                className="mt-5 rounded-full bg-red-700 px-5 py-2.5 text-sm text-white transition-colors hover:bg-red-800"
              >
                Explore All Videos
              </button>
            )}
          </div>
        )}

        {/* Footer count */}
        <p className="mt-9 text-center text-[10px] tracking-[0.2em] text-gray-500 sm:mt-12 sm:text-xs sm:tracking-widest">
          {videos.length} VIDEOS · {favorites.length} FAVOURITES · THE CHIFFON COLLECTION
        </p>
      </section>
    </main>
  );
}