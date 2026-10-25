import React from 'react';

const videoFiles = import.meta.glob('../assets/videos/*.mp4', {
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
  'md:row-span-2',
  'md:row-span-3',
  'md:row-span-2',
  'md:row-span-3',
  'md:row-span-2',
  'md:row-span-2',
  'md:row-span-3',
  'md:row-span-2',
];

export default function Lookbook() {
  return (
    <main className="min-h-screen bg-[#fffaf5] pb-20 pt-28 text-[#30231f]">
      {/* Gallery heading */}
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-700">
            The Bridal Film Collection
          </p>

          <h1 className="font-serif text-4xl font-medium sm:text-5xl md:text-6xl">
            A Closer Look at <span className="italic text-red-700">Elegance</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover the details, craftsmanship and timeless beauty
            behind our bridal outfits.
          </p>

          <div className="mx-auto mt-6 h-px w-20 bg-red-300" />
        </div>

        {/* Video masonry gallery */}
        {videos.length > 0 ? (
          <div className="grid auto-rows-[100px] grid-cols-2 gap-3 sm:auto-rows-[120px] sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video, index) => (
              <article
                key={video.id}
                className={`group relative overflow-hidden rounded-sm bg-[#eaded5] shadow-sm ${cardSizes[index % cardSizes.length]}`}
              >
                <video
                  src={video.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={video.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Elegant title overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-3 pb-4 pt-12 sm:px-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                    Bridal Edit {String(index + 1).padStart(2, '0')}
                  </p>

                  <h2 className="mt-1 font-serif text-sm text-white sm:text-lg">
                    {video.title}
                  </h2>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-gray-600">
            No videos found. Please check your videos folder.
          </p>
        )}

        <p className="mt-10 text-center text-xs tracking-widest text-gray-500">
          {videos.length} VIDEOS · THE CHIFFON COLLECTION
        </p>
      </section>
    </main>
  );
}