import React from "react";
import { Eye, ShoppingBag } from "lucide-react";

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
];

const TrendsSection = () => {
  return (
    <section className="max-w-full mx-auto px-4 py-12">

      <div className="flex justify-between items-center mb-8 max-w-[1320px] mx-auto">
        <h2 className="text-3xl font-bold">Trending Product</h2>
        <a href="#" className="text-sm font-medium hover:underline">
          VIEW ALL &rarr;
        </a>
      </div>


      <div
        className="flex flex-nowrap gap-6 justify-start max-w-[1320px] mx-auto"
        style={{ minWidth: "1320px" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col flex-shrink-0"
            style={{ width: "328px" }}
          >
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

         
            <div className="text-left">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="mt-1 text-base">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through mr-2">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className=" text-[24px]">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendsSection;
