"use client";

import React, { useState } from "react";
import { Eye, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Crimson Twilight Dreams",
    category: "Majestic Landscapes",
    price: 1450,
    oldPrice: 1750,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-3.jpg",
  },
  {
    id: 2,
    title: "Golden Sunset Horizon",
    category: "Elegant Portraits",
    price: 2050,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-1.jpg",
  },
  {
    id: 3,
    title: "Eternal Blooming Blossom",
    category: "Majestic Landscapes",
    price: 1850,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-2.jpg",
  },
  {
    id: 4,
    title: "Autumn Woodland Pathway",
    category: "Vibrant Still Life",
    price: 3650,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-4.jpg",
  },
  {
    id: 5,
    title: "Ocean Serenity Waves",
    category: "Contemporary Minimal",
    price: 1250,
    oldPrice: 1500,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-5.jpg",
  },
  {
    id: 6,
    title: "Golden Hour Reflections",
    category: "Elegant Portraits",
    price: 2900,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-6.jpg",
  },
  {
    id: 7,
    title: "Rustic Autumn Fields",
    category: "Majestic Landscapes",
    price: 1450,
    oldPrice: 1750,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-7.jpg",
  },
  {
    id: 8,
    title: "Modern Abstract Flow",
    category: "Contemporary Minimal",
    price: 2150,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-8.jpg",
  },
  {
    id: 9,
    title: "Serene Blue Horizon",
    category: "Vibrant Still Life",
    price: 1750,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-9.jpg",
  },
  {
    id: 10,
    title: "Golden Path",
    category: "Majestic Landscapes",
    price: 1950,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-10.jpg",
  },
  {
    id: 11,
    title: "Sunset Glow",
    category: "Elegant Portraits",
    price: 2750,
    oldPrice: null,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-11.jpg",
  },
  {
    id: 12,
    title: "Autumn Bliss",
    category: "Vibrant Still Life",
    price: 1450,
    oldPrice: 1750,
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-12.jpg",
  },
];

const AllProducts = () => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [openSections, setOpenSections] = useState({
    category: true,
    status: true,
    price: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="max-w-[1320px] mx-auto px-4 py-12 flex gap-8">

      <aside className="w-64  space-y-8">
        {/* Category */}
        <div>
          <div
            className="flex items-center justify-between    pt-15 cursor-pointer mb-3"
            onClick={() => toggleSection("category")}
          >
            <h3 className="font-medium   text-lg">Category</h3>
            {openSections.category ? (
              <ChevronUp size={20} className="text-black" />
            ) : (
              <ChevronDown size={20} className="text-black" />
            )}
          </div>
          {openSections.category && (
            <ul className="space-y-2 text-sm">
              {[
                "Majestic Landscapes",
                "Contemporary Minimal",
                "Elegant Portraits",
                "Vibrant Still Life",
              ].map((cat) => (
                <li key={cat} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{cat}</span>
                  </div>
                  <span className="text-[15px] bg-gray-200 px-2 py-0.5 rounded">
                    {{
                      "Majestic Landscapes": 3,
                      "Contemporary Minimal": 2,
                      "Elegant Portraits": 3,
                      "Vibrant Still Life": 3,
                    }[cat]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Status */}
        <div>
          <div
            className="flex items-center  justify-between cursor-pointer mb-3"
            onClick={() => toggleSection("status")}
          >
            <h3 className="font-medium text-lg">Product Status</h3>
            {openSections.status ? (
              <ChevronUp size={20} className="text-black" />
            ) : (
              <ChevronDown size={20} className="text-black" />
            )}
          </div>
          {openSections.status && (
            <ul className="space-y-2 text-[15px]">
              {["In stock", "Out of stock", "On sale"].map((status) => (
                <li key={status} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>{status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleSection("price")}
          >
            <h3 className="font-medium text-lg">Price</h3>
            {openSections.price ? (
              <ChevronUp size={20} className="text-black" />
            ) : (
              <ChevronDown size={20} className="text-black" />
            )}
          </div>
          {openSections.price && (
            <>
              <input
                type="range"
                min="570"
                max="3650"
                className="w-full accent-black"
              />
              <p className="text-sm mt-2">Price: $570 — $3,650</p>
            </>
          )}
        </div>

        {/* Upcoming Event Card - ayrı blok */}
        <div className="mt-6 relative rounded-lg overflow-hidden">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Picture-6.jpg"
            alt="Summer Art Exhibition 2024"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-4">
            <p className="uppercase text-sm tracking-wide mb-2">
              Upcoming Events
            </p>
            <h4 className="text-2xl font-bold">
              Summer Art Exhibition 2024
            </h4>
            <p className="text-sm mt-2">Date: August 24, 2024</p>
            <button className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
              KNOW MORE
            </button>
          </div>
        </div>
      </aside>

      {/* Product Listing */}
      <div className="flex-1">
        <div className="flex justify-end mb-6">
          <select className="border px-3 py-2 text-sm">
            <option>Default sorting</option>
            <option>Sort by price: low to high</option>
            <option>Sort by price: high to low</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <div key={product.id}>
              <div className="relative overflow-hidden rounded-lg group h-[382px] w-full mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 rounded-lg"
                />
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white rounded shadow p-2 hover:bg-gray-100">
                    <ShoppingBag size={20} className="text-gray-800" />
                  </button>
                  <button className="bg-white rounded shadow p-2 hover:bg-gray-100">
                    <Eye size={20} className="text-gray-800" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="mt-1 text-base">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through mr-2">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[20px]">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;

