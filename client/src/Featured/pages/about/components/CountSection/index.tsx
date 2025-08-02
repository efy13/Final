"use client";

import React, { useEffect, useState } from 'react';

const Counter = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <h3 className="text-4xl font-bold text-white">
      {prefix}{count}{suffix}
    </h3>
  );
};

const CountSection = () => {
  return (
    <section className="bg-white py-20 px-4 text-center">
      <div className="mb-10">
        <div className="h-[2px] w-16 bg-black mx-auto mb-4"></div>
        <h2 className="text-[40px] font-medium">We Reached So Far</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 max-w-9xl mx-auto">
        
        <div className="bg-black text-white rounded flex flex-col items-center justify-center w-[318.75px] h-[247px] mx-auto">
          <Counter end={60} prefix="+" />
          <p className="mt-4 text-lg text-center">Quick shipping platforms<br />for fastest transfers</p>
        </div>


        <div className="bg-black text-white rounded flex flex-col items-center justify-center w-[318.75px] h-[247px] mx-auto">
          <Counter end={420} prefix="+" />
          <p className="mt-4 text-lg text-center">Products sold till date<br />through all platforms</p>
        </div>

        
        <div className="bg-black text-white rounded flex flex-col items-center justify-center w-[318.75px] h-[247px] mx-auto">
          <Counter end={99} prefix="%" />
          <p className="mt-4 text-lg text-center">Satisfied Customer &<br />Happy client</p>
        </div>


        <div className="bg-black text-white rounded flex flex-col items-center justify-center w-[318.75px] h-[247px] mx-auto">
          <Counter end={12000} suffix="k" />
          <p className="mt-4 text-lg text-center">Registered users on our all<br />the platform</p>
        </div>
      </div>
    </section>
  );
};

export default CountSection;


