"use client";

import React, { useState } from "react";

const blogData = [
  {
    id: 1,
    title: "Trends In Contemporary Art",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-8-r232n7zr5oqx6qtmzgiozl1s5kcrg3rmn1t9j6pxg2.jpg",
  },
  {
    id: 2,
    title: "Caring For Your Oil Paintings",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-7-r232n71wyupmv4v04y42f3abk6he8enwax5s1wrbma.jpg",
  },
  {
    id: 3,
    title: "Exploring Abstract Techniques",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-1-r22sht8gbaj1rzlnq0aw6alum3ew4245efsy7qimc2.jpg",
  },
  {
    id: 4,
    title: "Framing Your Art Like A Pro",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-4-r232n568l6n27wxqfxata3redeqnt0gfmnut3cu3yq.jpg",
  },
  {
    id: 5,
    title: "Choosing The Right Canvas",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-6-r232n642s0ocjiwdafpfuliuysm10pk5ysiakmspsi.jpg",
  },
  {
    id: 6,
    title: "Why You Should Varnish Your Paintings",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-5-r232n568l6n27wxqfxata3redeqnt0gfmnut3cu3yq.jpg",
  },
  {
    id: 7,
    title: "The Return Of Realism In Art",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-2-r22sfkebzjge1iv2u1cz7v07iyhbq378fbp6xxuh76.jpg",
  },
  {
    id: 8,
    title: "Inspiration From The Art World",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-3-r22sgaptawgf2lsukcqj5od45qvlpm3puxysdorgcy.jpg",
  },
  {
    id: 9,
    title: "Bonus Blog On Page 2",
    image:
      "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-9-r232n8xlcis7ics9tyxbk2t8qy84nsvcz6gr0goj9u.jpg",
  },
];

// Kart tipi
interface BlogCardProps {
  image: string;
  title: string;
}

// Blog kartı bileşeni
const BlogCard = ({ image, title }: BlogCardProps) => (
  <div className="group">
    <div className="overflow-hidden rounded-md w-[615px] h-[405px]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <h2 className="text-2xl font-semibold mt-6 mb-2 text-center">{title}</h2>
    <p className="text-center text-sm text-gray-600">
      <a href="#" className="inline-flex items-center gap-1 hover:underline">
        Read More <span>→</span>
      </a>
    </p>
  </div>
);


const AllBlogs = () => {
  const [page, setPage] = useState(1);

  
  const currentItems =
    page === 1 ? blogData.slice(0, 8) : blogData.slice(8, 9);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
     
      <div className="text-center mb-8">
        <p className="text-gray-500 text-sm">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          / <span className="text-black font-medium">Blog</span>
        </p>
        <div className="mt-2 w-24 h-0.5 bg-black mx-auto"></div>
      </div>

      <h1 className="text-4xl font-bold text-center mb-12">
        Inspiration From The Art World
      </h1>


      <div
        className={`${
          page === 1
            ? "grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center"
            : "flex justify-start"
        }`}
      >
        {currentItems.map((blog) => (
          <BlogCard key={blog.id} image={blog.image} title={blog.title} />
        ))}
      </div>

  
      <div className="flex justify-center gap-3 mt-12">
        {[1, 2].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`w-10 h-10 rounded-full border text-sm font-medium transition-colors duration-300 ${
              page === num
                ? "bg-black text-white"
                : "bg-white border-gray-300 text-black hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
