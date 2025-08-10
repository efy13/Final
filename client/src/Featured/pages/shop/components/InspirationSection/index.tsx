
import React from "react";
import Link from "next/link";

const InspirationSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-36">
        
        <div className="flex justify-center">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-gray-500 flex items-center gap-2"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-black font-medium">Shop</span>
          </nav>
        </div>

      
        <div className="mt-6 flex justify-center">
          <div className="h-[2px] w-28 bg-black" />
        </div>

    
        <h1
          className="mt-8 text-center font-medium text-black leading-tight
                     sm:text-[40px] "
        >
          Inspiration From The Art World
        </h1>
      </div>
    </section>
  );
};

export default InspirationSection;
