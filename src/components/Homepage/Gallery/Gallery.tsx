import { useState } from "react";

// Import gallery images from assets
import gallery2 from "@/assets/gallery/car1.png";
import gallery1 from "@/assets/gallery/car5.png";
import gallery3 from "@/assets/gallery/car2.png";
import gallery4 from "@/assets/gallery/car7.png";
import gallery5 from "@/assets/gallery/car10.png";
import gallery6 from "@/assets/gallery/car13.png";
import gallery7 from "@/assets/gallery/car14.png";

interface GalleryImage {
  id: string;
  src: string;
}

const Gallery = () => {
  // Initialize with static gallery images
  const initialImages: GalleryImage[] = [
    { id: "1", src: gallery1 },
    { id: "2", src: gallery2 },
    { id: "3", src: gallery3 },
    { id: "4", src: gallery4 },
    { id: "5", src: gallery5 },
    { id: "6", src: gallery6 },
    { id: "7", src: gallery7 },
  ];

  const [images] = useState<GalleryImage[]>(initialImages);

  return (
    <section className="container mx-auto px-4 pb-10">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold relative inline-block">
          <span className="text-brand-secondary">Our</span>
          <span className="text-brand-primary"> Gallery</span>
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            } relative group aspect-square overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2`}
          >
            <img
              src={image.src}
              alt={`gallery-${index + 1}`}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
            <div className="bg-black rounded-xl absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
