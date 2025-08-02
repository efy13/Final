import React from 'react'
import { FaInstagram } from 'react-icons/fa'

const images = [
  "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-4-768x895.jpg",
  "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-5.jpg",
  "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-7.jpg",
  "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-5-min.jpg",
  "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-10.jpg",
  "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-1.jpg",
]

const InstagramSection = () => {
  return (
    <section className="pt-24 pb-0 px-4 ">

      <div className="flex justify-between items-center mb-6 py-10">
        <h2 className="text [40px] md:text-4xl border-l-4 border-black pl-3">
          Our Instagram
        </h2>
        <a href="#" className="text-sm font-semibold hover:underline flex items-center gap-1">
          VIEW ALL <span className="text-lg">›</span>
        </a>
      </div>

    
      <div className="flex gap-0 overflow-x-auto flex-nowrap">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group flex-shrink-0 rounded-md"
            style={{ width: '236.66px', height: '408px' }}
          >
            <img
              src={img}
              alt={`Instagram ${index}`}
              className="w-full h-full object-cover transition duration-500"
            />
      
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <FaInstagram className="text-white text-4xl transform 
                opacity-0 
                translate-y-[-30px] rotate-[-45deg]
                group-hover:translate-y-0 
                group-hover:rotate-[0deg]
                group-hover:opacity-100
                transition-all duration-500 ease-in-out
              " />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InstagramSection
