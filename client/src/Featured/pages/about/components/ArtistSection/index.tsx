import React from "react";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

const artists = [
  {
    name: "Michael Thompson",
    role: "Abstract Innovator",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/85858-min.jpg",
  },
  {
    name: "Olivia Chen",
    role: "Landscape Virtuoso",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/3182-1.jpg",
  },
  {
    name: "John Anderson",
    role: "The Impressionist",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2149737812-min.jpg",
  },
  {
    name: "David Wilson",
    role: "The Realist",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2148014136-min.jpg",
  },
];

const ArtistSection = () => {
  return (
    <div className="py-16 px-4 md:px-20 text-center">
    
      <div className="flex flex-col items-center mb-12">
        <div className="w-28 border-t-2 border-black mb-4"></div>
        <h2 className="text-[40px] font-medium">Meet Our Artists</h2>
      </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {artists.map((artist, index) => (
          <div key={index} className="group text-center relative">
            <div className="relative overflow-hidden w-full aspect-[353/406] max-w-[353px] mx-auto">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover transition duration-500 group-hover:blur-[1px] group-hover:scale-95"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaFacebookF className="text-white text-xl hover:text-[#1877f2] cursor-pointer transition" />
                <FaXTwitter className="text-white text-xl hover:text-gray-300 cursor-pointer transition" />
                <FaInstagram className="text-white text-xl hover:text-[#e1306c] cursor-pointer transition" />
              </div>
            </div>

            <p className="text-gray-500 text-[15px] mt-4 text-left">{artist.role}</p>
            <h3 className="text-[25px] font-medium text-left">{artist.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistSection;
