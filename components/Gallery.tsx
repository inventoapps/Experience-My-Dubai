"use client";

const galleryImages = [
  {
    src: "/images/gallery1.webp",
    alt: "Dubai beach landscape",
  },
  { src : "/images/gallery2.webp",
    alt: "Desert safari jeep adventure",
  },
  { src : "/images/gallery3.webp",
    alt: "Iconic Burj Al Arab hotel",
  },
  { src : "/images/gallery4.webp",
    alt: "Palm Jumeirah aerial view",
  },
];

export default function Gallery() {
  return (
    <section
      className="py-14 px-6 sm:px-0 max-w-7xl mx-auto"
      aria-labelledby="dubai-gallery-heading"
    >
      {/* Heading */}
      <h2
        id="dubai-gallery-heading"
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 "
      >
        Dubai Travel Gallery
      </h2>

      {/* Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-3 
          md:grid-cols-4 
          gap-4
          sm:px-6
          px-4
        "
      >
        {galleryImages.map((img, index) => (
          <figure
          key={index}
          className="overflow-hidden rounded-2xl shadow group cursor-pointer bg-white"
        >
          <div className="aspect-square w-full"> 
            {/* 1:1 square – adjust to 4/3 or 16/9 if you want */}
              <img
                src={img.src}
                alt={img.alt}
                className="
                  object-cover 
                  w-full 
                  h-full 
                  rounded-2xl
                  transition-transform 
                  duration-500 
                  group-hover:scale-110
                "
              />
          </div>
         </figure>
      ))}
      </div>
    </section>
  );
}
