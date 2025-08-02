import React from 'react';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <nav className="text-gray-500 text-sm mb-2">
        <Link href="/" className="hover:underline text-gray-500">
          Home
        </Link>
        <span className="mx-1">›</span>
        <span className="font-medium text-black">Contact</span>
      </nav>

      <h1 className="text-[82px] font-medium mb-4">Contact Us</h1>

      <div className="w-1 h-16 bg-black mx-auto my-6" />

      <p className="text-gray-600 text-[15px] max-w-3xl mx-auto">
        We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
        Your thoughts and inquiries are important to us, and we’re here to help in any way we can.
      </p>
    </div>
  );
};

export default ContactUs;
