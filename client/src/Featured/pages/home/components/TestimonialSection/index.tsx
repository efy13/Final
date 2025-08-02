"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Kathryn Murphy",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "I was blown away by the quality of the oil painting I received! The attention to detail and the vibrant colors are simply stunning. It has become the centerpiece of my living room, and I get compliments from everyone who visits. Highly recommend this artist!",
  },
  {
    name: "John Doe",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "Amazing artwork! The painting exceeded my expectations. Beautiful texture, amazing expression. Will definitely buy again.",
  },
];

const TestimonialSlider = () => {
  return (
    <div className="max-w-[1250px] mx-auto p-4 ">
      <div className="text-center">
        <h2 className=" py-19 text-4xl md:text-5xl font-bold text-black py-10">
          What Our Collectors Are Saying
        </h2>
      </div>

      <div className="">
        <div className="bg-black px-10 text-white p-[70px] relative">
          <div className=" relative overflow-visible">
            <div className="absolute top-1/2 -left-10 -translate-y-1/2 z-10 swiper-button-prev-custom cursor-pointer">
              <ChevronLeft className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 z-10 swiper-button-next-custom cursor-pointer">
              <ChevronRight className="w-8 h-8 text-white" />
            </div>

            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              loop
              className="w-full"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center text-center space-y-10 py-[50px] px-[70px]">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white"
                    />
                    <p className="text-[25px] leading-relaxed italic">
                      “{testimonial.content}”
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
