import React from "react";

const AwardSection = () => {
  return (
    <section className="flex justify-center items-center py-16 bg-white relative pt-60">

      <div className="w-[561px] h-[722px] overflow-hidden">
        <img
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-5-min.jpg"
          alt="City Landscape"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-xl pl-30">
        <h2 className="text-3xl font-bold mb-8 border-t border-black pt-4">
          Award-Winning Art
        </h2>
        <p className="text-lg font-semibold mt-2">Arlene McCoy</p>
        <p className="text-sm text-gray-700 mb-6">Landscape City View</p>
        <p className="text-gray-600 mb-8">
          Our gallery has proudly received multiple awards for outstanding
          contributions to the world of fine art. Our curated collections have
          been celebrated at prestigious art fairs and exhibitions, where our
          artists’ work continues to captivate audiences.
        </p>
        <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition">
          VIEW DETAIL
        </button>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <img
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Vector.svg"
          alt="Logo"
          style={{ width: "171px", height: "148.99px" }}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default AwardSection;
