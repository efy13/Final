import React from "react";

const AviableSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-10 gap-10">
  
      <div
        className="w-[678.31px] h-[618.55px] flex justify-center items-center"
        style={{ minWidth: "678.31px", minHeight: "618.55px" }}
      >
        <img
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2148117940-min.jpg"
          alt="Support"
          className="w-full h-full object-cover"
        />
      </div>

  
      <div className="w-full md:w-1/2 md:ms-20 text-center md:text-left">
        <div className="border-t-2 border-black w-34 mb-4"></div>
        <h2 className="text-[40px] font-medium mb-4">We Are Available 24/7 For You!</h2>
        <p className="text-gray-600 mb-6 text[16px]">
          We are available 24/7/365 for you! Do you want to surprise someone?
          Take advantage of our gift service. Do you need advice? One of our
          private shoppers will be happy to help you put together an ideal time,
          give priority and get more packages.
        </p>
        <button className="border border-black px-10 py-5  hover:bg-black hover:text-white transition duration-300">
          OUR SUPPORT
        </button>
      </div>
    </div>
  );
};

export default AviableSection;
