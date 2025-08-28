"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/http/api";
import Link from "next/link";

const AllBlogs = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAPi("/blogs"),
  });

  const blogs = data?.data || [];

  return (
    <section className="max-w-[1320px] mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <p className="text-gray-500 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="text-black font-medium">Blog</span>
        </p>
        <div className="mt-2 w-24 h-0.5 bg-black mx-auto"></div>
      </div>

      <h1 className="text-4xl font-bold text-center mb-12">
        Inspiration From The Art World
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.slice(0, visibleCount).map((blog: any) => (
          <div key={blog._id}>
            <Link href={`/blog/${blog._id}`}>
              <div className="relative overflow-hidden rounded-lg group h-[382px] w-full mb-4 cursor-pointer">
                <img
                  src={blog?.imageUrl}
                  alt={blog?.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 rounded-lg"
                />
              </div>
            </Link>
            <h3 className="font-semibold text-lg">{blog?.title}</h3>
          </div>
        ))}
      </div>

      {visibleCount < blogs.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default AllBlogs;
