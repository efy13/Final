import React from 'react';
import Image from 'next/image'; // Next.js istifadə edirsənsə

const InspireSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center px-6 py-12 lg:py-20 bg-white gap-8">
      {/* Şəkil hissəsi */}
      <div className="w-[678px] h-[707px] relative">
        <Image
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/05/35003-1.jpg" // Öz şəkil yolunu buraya qoy
          alt="Painter"
          fill
          className="object-cover "
        />
      </div>

      {/* Mətn hissəsi */}
      <div className="max-w-xl ms-30">
        <div className="h-[2px] w-35 bg-black mb-4"></div>
        <h2 className="text-[40px] mb-6 font-medium leading-tight">
          Inspire Creativity And Foster A <br /> Deep Appreciation
        </h2>
        <p className="text-gray-600 text-[16px] leading-relaxed">
          Our mission is to inspire creativity and foster a deep appreciation for the craft of oil painting. We believe that oil painting is more than just a technique—it’s a way to express emotions, tell stories, and capture the beauty of the world around us. Whether you’re a seasoned artist or just starting out, we’re here to support your artistic journey with resources, tips, and inspiration.
        </p>
      </div>
    </section>
  );
};

export default InspireSection;
