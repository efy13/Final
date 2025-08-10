import React from "react";

const EmailSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="mb-12">
        {/* Yazı üstü xətt */}
        <div className="border-t-4 border-black w-16 mb-4"></div>

        {/* Başlıq və açıqlama */}
        <h2 className="text-[40px] font-medium mb-2 text-left">
          Please Get In Touch
        </h2>
        <p className="text-gray-600 text-left text-[16px]">
          For assistance with your orders, account, or any technical issues,
          our customer support team is here to help
        </p>
      </div>

      <form className="space-y-8">
        {/* İki input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-800">
              Your name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="w-[565px] h-[56px] border border-gray-400 p-3"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-800">
              Your email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-[565px] h-[56px] border border-gray-400 p-3"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Textarea */}
        <div className="flex flex-col">
          <label htmlFor="comment" className="mb-2 TEXT-[15px] font-medium #6E6E6E">
            Your Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            className="w-[1160px] h-[155.79px] border border-gray-400 p-3"
            placeholder="Type your comment here"
          ></textarea>
        </div>

        {/* Button */}
        <div>
          <button
            type="submit"
            className="border border-black px-8 py-4 hover:bg-black hover:text-white transition duration-300"
          >
            Send Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailSection;
