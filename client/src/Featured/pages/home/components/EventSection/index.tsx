"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    title: "Summer Art Exhibition",
    date: "August 24",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-4-min.jpg",
  },
  {
    title: "Autumn Collection",
    date: "September 10",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-4-min.jpg",
  },
];

const EventSection = () => {
  return (
    <div className="relative w-full h-[572px]">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        navigation
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[572px]">
              
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
                <p className="text-lg mb-2">Upcoming Events</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm mb-6">Date: {slide.date}</p>
                <button className="bg-white text-black font-semibold px-6 py-3 hover:bg-gray-100 transition">
                  KNOW MORE
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSection;
