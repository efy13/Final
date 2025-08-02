"use client";
import React from "react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="text-center px-4 py-12">
    
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>{" "}
        <span className="mx-1">/</span> <span className="text-black">About</span>
      </div>

      
      <h1 className="text-[82px] font-bold mb-4">About Us</h1>

      <div className="w-1 h-16 text[15px] bg-black mx-auto mb-6" />

 
      <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
        your destination for all things oil painting. We are passionate about the timeless art of oil painting and dedicated to helping artists of all skill levels explore, learn, and create with this versatile medium. your destination for all things oil painting. We are passionate about the timeless art of oil painting and dedicated to helping artists of all skill levels explore, learn, and create with this versatile medium.
      </p>
    </div>
  );
};

export default AboutUs;
