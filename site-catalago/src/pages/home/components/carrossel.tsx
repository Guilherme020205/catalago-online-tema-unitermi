import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useEffect, useState, type ReactNode } from "react";

interface CarrosselProps {
  children: ReactNode;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function Carrossel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarrosselProps) {
  const slidesArray = React.Children.toArray(slides);
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr == 0 ? slidesArray.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr == slidesArray.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slidesArray}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white cursor-pointer"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white cursor-pointer"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slidesArray.map((_, i) => (
            <div
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${curr == i ? "p-2" : "bg-opacity-50"}
                `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
