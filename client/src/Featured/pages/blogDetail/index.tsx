import React from "react";
import Image from "next/image";


const BlogDetail = () => {
  return (
    <div className="w-full container-fluid ">
     
      <div className="relative w-[1430px]  mx-auto">
        <Image
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-post-8.jpg"
          alt="Trends In Contemporary Art"
          width={1430}
          height={750}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" />
        {/* Üstteki metin */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12 text-white max-w-4xl">
            <p className="text-sm md:text-base mb-2">
              Outdoor, Painting • 4 min read
            </p>
            <h1 className="text-[62px] font-bold mb-4">
              Trends In Contemporary Art
            </h1>
            <div className="flex items-center gap-3 text-sm md:text-base">
              <Image
                src="https://xstore.8theme.com/elementor2/home-decor02/wp-content/uploads/sites/9/2023/04/ava.jpg"
                alt="Rosetyler"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span>Author: rosetyler</span>
              <span>•</span>
              <span>Published: February 25 text[20px]</span>
              <span>•</span>
              <span>No Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-8 ml-10">
        <h2 className="text-[42px] font-medium mb-4">
          Art Of Layering Oil Paint
        </h2>

        <p className="text-gray-700  text-[20px] mb-4">
          Oil painting is a medium rich in tradition and complexity, allowing
          artists to achieve remarkable depth and texture in their work. One of
          the most powerful techniques in oil painting is layering, which can
          bring your artwork to life with subtle transitions,{" "}
          <span className="text-red-500 font-medium">
            vibrant colors, and intricate details
          </span>
          . Whether you’re a beginner or an experienced painter, mastering the
          art of layering is essential to creating compelling oil paintings. In
          this post, we’ll explore the key principles and techniques for
          effective layering in oil painting.
        </p>

        <p className="text-gray-700 text-[20px]">
          Layering is a fundamental technique in oil painting that involves
          applying multiple layers of paint, each building upon the previous
          one. This process allows artists to create depth, adjust colors, and
          refine details gradually. Unlike other painting mediums, oil paint’s
          slow{" "}
          <span className="text-red-500 font-medium">
            drying time makes it ideal for layering
          </span>
          , as it provides ample time to work with the paint and make
          adjustments.
        </p>
      </div>

      <div className="widget-card">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/1.jpg"
            alt="Left artwork"
            className="w-[478px] h-[520px] object-cover"
          />
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2.jpg"
            alt="Right artwork"
            className="w-[910px] h-[520px] object-cover"
          />
        </div>

        <p className="text-center text-gray-400 text-[17px] mt-4 tracking-wide">
          PHOTOGRAPHY BY RICHARD WINTERS
        </p>
      </div>
   
      <div className="content-block px-4  ms-6 mt-12 text-left">
        <p className="text-gray-600 text-[20px] mb-6">
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced
          below for those interested. Sections{" "}
          <span className="text-red-500">1.10.32</span> and{" "}
          <span className="text-red-500">1.10.33</span>
          from{" "}
          <a href="#" className="text-black underline">
            “de Finibus Bonorum et Malorum”
          </a>
          by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham.
        </p>

        <h2 className="text-[42px] font-medium mb-6">
          Starting With An Underpainting
        </h2>
        <div className="grid grid-cols-1 mt-10 xl:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 text-[20px] mb-4">
              Layering is a fundamental technique in oil painting that involves
              applying multiple layers of paint, each building upon the previous
              one. This process allows artists to create depth, adjust colors
            </p>
          </div>

          <div>
            <p className="text-gray-700 text-[20px]">
              and refine details gradually. Unlike other painting mediums, oil
              paint’s slow drying time makes it ideal for layering, as it
              provides ample time to work with the paint and make adjustments.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-gray-700 text-[20px] mb-4">
            {" "}
            The first step in the layering process is the underpainting. This
            initial layer serves as the foundation for your painting,
            establishing the composition, values, and overall mood. Typically,
            underpaintings are done in a<span className="text-red-500"> monochromatic palette</span>,
            using a neutral color like burnt sienna or raw umber. This helps to
            create a tonal map that guides your subsequent layers.
          </h3>
        </div>
      </div>
      <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
      <div className="p-4">
      <div className="w-full flex justify-center py-6">
<div className="w-[1500px] h-[530px] px-4">
<div className="relative w-full h-full overflow-hidden  bg-white">
<Image
src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/2150170357.jpg" // Put your image into /public/banner.jpg or replace with a remote URL
alt="Painter working on a landscape canvas"
fill
priority
className="object-cover object-left"
sizes="1500px"
/>
</div>
</div>
</div>

</div>

</div>

</div>
<div className="w-full flex justify-center py-12">
<div className="w-[1400px] px-4">
<div className="grid grid-cols-12 gap-10 items-start">
{/* LEFT: Big headline */}
<div className="col-span-12 lg:col-span-6">
<h1 className="font-semibold leading-tight tracking-tight text-[42px]">
You Should Think Like Artist
<br />
In Your Painting And Get
<br />
Best Export
</h1>
</div>


{/* RIGHT: Paragraphs */}
<div className="col-span-12 lg:col-span-6 text-gray-600 text-[20px] leading-8">
<p>
Oil painting is a medium rich in tradition and complexity, allowing artists to
achieve remarkable depth and texture in their work. One of the most
powerful techniques in oil painting is layering, which can bring your
artwork to life with subtle transitions, <span className="text-red-500">vibrant colors, and intricate details</span>.
</p>
<p className="mt-6">
Whether you’re a beginner or an experienced painter, mastering the art
of layering is essential to creating compelling oil paintings. In this post,
we’ll explore the key principles and techniques for effective layering in oil
painting.
</p>
</div>
</div>
</div>
</div>
<div className="flex items-center justify-between max-w-[1320px] mx-auto px-4 py-4">
  {/* Sol taraf: Kategoriler */}
  <p className="uppercase tracking-wide text-[18px] md:text-[20px] text-[#3e3e3e]">
    HAND PAINTED , OIL PAINTING , ORIGINAL ART
  </p>

  {/* Sağ taraf: Sosyal ikonlar */}
  <div className="flex items-center gap-5 text-[#555]">
    {/* Facebook */}
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
      </svg>
    </a>

    {/* LinkedIn */}
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 3A2 2 0 0 1 22 5v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16zM8.3 17v-7H5.8v7h2.5zm-1.2-8.2a1.5 1.5 0 1 0 0-3c-.9 0-1.6.6-1.6 1.5 0 .8.7 1.5 1.6 1.5zM18 17v-3.6c0-2.2-1.2-3.3-2.8-3.3-1.3 0-1.9.7-2.2 1.2V10h-2.5v7h2.5v-3.5c0-.2.1-.4.2-.6.3-.4.6-.8 1.2-.8.8 0 1.1.6 1.1 1.5V17H18z" />
      </svg>
    </a>

    {/* Pinterest */}
    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a10 10 0 0 0-3.5 19.4c-.1-.8-.2-2 .1-2.9.2-.7 1.3-4.3 1.3-4.3s-.3-.6-.3-1.4c0-1.3.7-2.2 1.6-2.2.8 0 1.1.6 1.1 1.3 0 .8-.5 2-0.8 3-.2.9.4 1.7 1.3 1.7 1.6 0 2.9-1.7 2.9-4.1 0-2.2-1.6-3.8-3.9-3.8-2.6 0-4.1 1.9-4.1 3.9 0 .8.3 1.7.7 2.2.1.1.1.2.1.3-.1.3-.2 1-.2 1.1 0 .2-.2.3-.4.2-1.2-.5-1.9-2-1.9-3.3 0-2.7 1.9-5.2 5.7-5.2 3 0 5.3 2.1 5.3 4.9 0 3-1.9 5.4-4.6 5.4-.9 0-1.7-.5-2-1 .1.5.2 1 .1 1.6-.2.8-.5 2.2-.6 2.5-.2.8-.8 2.1-1.2 2.8A10 10 0 1 0 12 2z" />
      </svg>
    </a>

    {/* Skype */}
    <a href="https://skype.com" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a10 10 0 0 0-3.1 19.5c.2-.4.5-.8.6-1.2.1-.4.2-.9.3-1.4l.2-.7c.1-.4.2-.7.2-1-.1-.2-.2-.4-.3-.6-.4-.6-.6-1.4-.6-2.3 0-2.7 2.1-5 5.7-5 2.7 0 4.5 1.7 4.5 4.3 0 2.8-1.5 4.8-3.5 4.8-.8 0-1.5-.3-1.7-.8l-.5 1.9c-.2.8-.5 1.6-.9 2.3A10 10 0 1 0 12 2z" />
      </svg>
    </a>
  </div>
</div>
<div className="w-[1400px] mt-10 h-[129.5px] bg-black text-white flex items-center justify-between px-6 rounded-none mx-auto relative">
      {/* Sol taraf */}
      <div className="flex items-center gap-4 group transition-transform">
        <Image
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-post-7-100x100.jpg"
          alt="oil painting"
          width={80}
          height={80}
          className="object-cover transform group-hover:scale-110 duration-0"
        />
        <h2 className="text-xl font-semibold transform group-hover:scale-110 duration-0">
          Caring for Your Oil Paintings
        </h2>
      </div>

      {/* Ortadaki menu sembolü */}
      <a
        href="/blog"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          viewBox="0 0 24 24"
          className="hover:scale-110 transition-transform"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </a>
    </div>
    <div className="max-w-[1320px] px-4 mt-10 py-12 flex items-center gap-8">
  {/* Sol: Profil resmi */}
  <div className="relative w-[170px] h-[170px] shrink-0">
    <Image
      src="https://xstore.8theme.com/elementor2/home-decor02/wp-content/uploads/sites/9/2023/04/ava.jpg"
      alt="Rosetyler"
      fill
      className="rounded-full object-cover"
    />
  </div>

  {/* Sağ: Yazar bilgisi */}
  <div>
    <h3 className="text-[24px] font-semibold text-[#1f1f1f]">Rosetyler</h3>
    <p className="mt-3 text-[17px] text-[#4b4b4b] leading-8 max-w-[900px]">
      There are many variations of passages of available, but the majority
      have suffered alteration in some form, by injected humour, or
      randomised words which don&apos;t look even slightly believable. If
      you are going there isn&apos;t anything embarrassing hidden in the
      middle of text.
    </p>
  </div>
</div>
<div className="max-w-[1400px] mx-auto mt-10 px-4">
  {/* Başlık */}
  <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-2">Add Comment</h2>
  <p className="text-gray-500 mb-4">
    Your email address will not be published. Required fields are marked
  </p>

  {/* Yorum Alanı */}
  <div>
    <textarea
      placeholder="Comment"
      className="w-[1400px] h-[200px] border border-gray-300 p-4 rounded-md resize-none"
    />
  </div>

  {/* Input Alanları */}
  <div className="flex gap-4 mt-4">
    <input
      type="text"
      placeholder="Your name (required)"
      className="flex-1 border-b border-gray-300 py-2 focus:outline-none"
    />
    <input
      type="email"
      placeholder="Your email (required)"
      className="flex-1 border-b border-gray-300 py-2 focus:outline-none"
    />
    <input
      type="text"
      placeholder="Your website"
      className="flex-1 border-b border-gray-300 py-2 focus:outline-none"
    />
  </div>

  {/* Checkbox */}
  <div className="mt-4 flex items-center gap-2">
    <input type="checkbox" className="w-4 h-4" />
    <span className="text-gray-600 text-sm">
      Save my name, email, and website in this browser for the next time I
      comment.
    </span>
  </div>

  {/* Buton */}
  <button className="mt-6 px-6 py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition">
    Post Comment
  </button>
</div>






    </div>
  );
};

export default BlogDetail;
