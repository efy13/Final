import React from 'react';

const blogPosts = [
  {
    title: "Trends In Contemporary Art",
    image: "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Image-product-2-768x895.jpg",
    link: "#",
  },
  {
    title: "Caring For Your Oil Paintings",
    image: "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/elementor/thumbs/Image-post-7-r232n71wyupmv4v04y42f3abk6he8enwax5s1wrbma.jpg",
    link: "#",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 pt-30 bg-white text-center">
      <h2 className="text-[40px] font-semibold mb-12">Latest From Blog</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="w-[615px]">
            <div className="overflow-hidden rounded-md">
              <img
                src={post.image}
                alt={post.title}
                className="w-[615px] h-[405px] object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="mt-6 text-[27px] font-medium">{post.title}</h3>
            <a
              href={post.link}
              className="mt-2 pt-6 inline-block text-[16px] text-black font-medium hover:underline"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
