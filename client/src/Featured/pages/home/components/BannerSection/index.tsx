import React from 'react';

const BannerSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
   
      <div className="flex flex-col gap-4">
        <div className="relative group overflow-hidden rounded-lg w-[455.4px] h-[333.89px]">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-min.jpg"
            alt="Crimson Twilight Dreams"
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold m-0 p-0">Crimson Twilight Dreams</h3>
            <p className="text-sm m-0 p-0">From 580$</p>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-lg w-[455.4px] h-[333.89px]">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-1-min.jpg"
            alt="Capturing The Beauty Of Nature"
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold m-0 p-0">Capturing The Beauty Of Nature</h3>
            <p className="text-sm m-0 p-0">From 950$</p>
          </div>
        </div>
      </div>

      {/* Right side (1 large image spanning 2 rows) */}
      <div className="relative group overflow-hidden rounded-lg md:col-span-2 w-[924.6px] h-[686.93px]">
        <img
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-2-min.jpg"
          alt="Bringing Art To Life On Canvas"
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
        <div className="absolute bottom-8 left-8 text-white max-w-md">
          <h3 className="text-3xl md:text-4xl font-bold m-0 p-0 mb-2">Bringing Art To Life On Canvas</h3>
          <p className="mb-4 m-0 p-0">From 1,460$</p>
          <button className="bg-white text-black px-4 py-2 rounded">VIEW DETAIL</button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
