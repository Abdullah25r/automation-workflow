import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const desktopImages = [
  "/img/ronin-desk.jpg",
  "/img/ronin2-desk.webp",
  "/img/ronin3-desk.webp",
  "/img/ronin4-desk.webp"
];
const mobileImages = [
  "/img/ronin-mob.jpg",
  "/img/ronin2-mob.jpg",
  "/img/ronin3-mob.jpg",
  "/img/ronin4-mob.jpg"
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const carouselImages = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden rounded-xl">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
            }}
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      ))}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-30 hover:bg-opacity-50'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Carousel;