import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row min-h-screen items-center justify-center">
 
      <div className="w-full md:w-[681px] h-[710px]">
        <img
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-3-min.jpg" 
          alt="Painter"
          className="w-[681px] h-[730px] object-cover"
        />
      </div>

  
      <div className="w-full md:w-1/2 bg-white p-30">
        <div className="border-t border-black w-16 mb-6"></div>
        <h1 className="text-[40px] font-semibold mb-4">
          XStore Elementor Painting Studio Demo
        </h1>
        <p className="mt-[10px] mb-[calc(var(--kit-widget-spacing,0px)+0px)] text-left font-[Outfit] text-[16px] font-normal leading-[26px] text-[#555]">
  our mission is to inspire creativity and foster a deep appreciation
  for the craft of oil painting. We believe that oil painting is more
  than just a technique—it’s a way to express emotions.
</p>

<button className="bg-[#FFF0] font-[Outfit] text-[16px] uppercase fill-black text-black border border-black rounded-none px-[51px] py-[20px] mt-10 transition hover:bg-black hover:text-white">
  ABOUT US
</button>

      </div>
    </section>
  );
};

export default HeroSection;
