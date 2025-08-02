import React from 'react';
import Image from 'next/image';

const TutorialSection = () => {
  return (
    <section className="flex flex-col  lg:flex-row text-left px-10  py-19 gap-10 bg-white">
      
      <div className="max-w-md pt-29">
        <div className="h-[2px] w-30 bg-black mb-4 "></div>
        <h2 className="text-4xl font-medium mb-6 leading-tight ">
          We Provide Step-By-<br />Step Tutorials
        </h2>
        <p className="text-gray-600 text-[16px] leading-relaxed">
          Guide you through various oil painting techniques, from basic brushwork to advanced layering and glazing. Our tutorials are designed to be accessible and easy to follow, helping you develop your skills at your own pace.
        </p>
      </div>

     
      <div className="flex gap-6 ps-20">
     
        <div className="w-[446px] h-[547px] relative">
          <Image
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2150170357-min.jpg" // Öz şəkil yolunu dəyiş
            alt="Painting tutorial"
            fill
            className="object-cover rounded"
          />
        </div>

    
        <div className="w-[329px] h-[547px] relative">
          <Image
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2148612658-min.jpg" // Öz şəkil yolunu dəyiş
            alt="Brush palette"
            fill
            className="object-cover rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;
