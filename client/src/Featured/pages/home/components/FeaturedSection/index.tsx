import React from "react";

const FeaturedCollection = () => {
  return (
    <section className="px-8 py-16 bg-white">

      <div className="mb-10">

        <div className="w-24 border-t-2 border-black mb-2"></div>


        <div className="flex items-center justify-between">
          <h2 className="text-[40px] font-bold">Featured Collection</h2>
          <a
            href="#"
            className="text-sm font-semibold uppercase flex items-center gap-1 hover:underline"
          >
            VIEW ALL <span className="text-lg">›</span>
          </a>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="relative group overflow-hidden w-full h-[685px]">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture.jpg"
            alt="Moon Painting"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:-translate-x-2"
          />
      
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-6">
            <div className="w-36 border-t-2 border-white mb-3"></div>
            <h3 className="text-[32px] font-semibold">World Of Abstract Art</h3>
            <p className="text-[16px] my-4">14 Lots</p>
          </div>
        </div>

     
        <div className="relative group overflow-hidden w-full h-[685px]">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-1.jpg"
            alt="Woman Painting"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:translate-x-2"
          />
       
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-6">
            <div className="w-36 border-t-2 border-white mb-3"></div>
            <h3 className="text-[32px] font-semibold">Still Life Collection</h3>
            <p className="text-[16px] my-4">7 Lots</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
