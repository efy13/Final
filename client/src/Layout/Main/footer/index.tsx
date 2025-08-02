const Footer = () => {
  return (
    <footer className="bg-black text-white text-base">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div>
          {/* Logo */}
          <div className="mb-8">
            <img
              src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/footer-logo-min.png"
              alt="Logo"
              className="w-48 mb-4"
            />
            <p className="font-bold text-2xl">Oil Painting</p>
          </div>

          {/* İletişim Bilgileri */}
          <ul className="space-y-6 text-lg">
            <li className="flex items-center gap-4">
              {/* Telefon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h2l3.6 7.59a1 1 0 00.76.41H17a1 1 0 001-1V7a1 1 0 011-1h2"
                />
              </svg>
              +1 2222 33 444 55
            </li>

            <li className="flex items-center gap-4">
              {/* Mail SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l-4-4-4 4m0 0l4 4 4-4"
                />
              </svg>
              Info@ITcompany.com
            </li>

            <li className="flex items-center gap-4">
              {/* Konum SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4-2-2.9-2-4z"
                />
              </svg>
              123 Tech Avenue, Suite 100, City, State, ZIP Code
            </li>
          </ul>

          {/* Sosyal Medya */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="bg-white p-3 rounded">
              {/* Facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82V14.708h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.505 0-1.797.717-1.797 1.767v2.318h3.59l-.467 3.62h-3.123V24h6.125C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="bg-white p-3 rounded">
              {/* YouTube */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184a2.99 2.99 0 012.106 2.115C22 6.29 22 12 22 12s0 5.71-.279 6.701a2.99 2.99 0 01-2.106 2.115C18.414 21.25 12 21.25 12 21.25s-6.414 0-7.615-.434a2.99 2.99 0 01-2.106-2.115C2 17.71 2 12 2 12s0-5.71.279-6.701a2.99 2.99 0 012.106-2.115C5.586 2.75 12 2.75 12 2.75s6.414 0 7.615.434zM10 8.7v6.6l5.2-3.3-5.2-3.3z" />
              </svg>
            </a>
            <a href="#" className="bg-white p-3 rounded">
              {/* Twitter */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6.003c-.793.353-1.644.592-2.538.698a4.44 4.44 0 001.95-2.456 8.888 8.888 0 01-2.81 1.074 4.423 4.423 0 00-7.545 4.035 12.555 12.555 0 01-9.112-4.619 4.417 4.417 0 001.368 5.903 4.39 4.39 0 01-2.005-.554v.056a4.423 4.423 0 003.547 4.332 4.413 4.413 0 01-1.995.075 4.427 4.427 0 004.135 3.071A8.873 8.873 0 012 19.54a12.52 12.52 0 006.798 1.992c8.158 0 12.613-6.757 12.613-12.614 0-.192-.004-.383-.013-.573a9.006 9.006 0 002.215-2.292z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 relative after:block after:w-16 after:h-[3px] after:bg-white after:mt-2">
            Quick Link
          </h3>
          <ul className="space-y-4 text-lg">
            <li>&gt; Home</li>
            <li>&gt; Shop</li>
            <li>&gt; Category</li>
            <li>&gt; Contact</li>
            <li>&gt; About</li>
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-xl font-bold mb-6 relative after:block after:w-16 after:h-[3px] after:bg-white after:mt-2">
            Customer
          </h3>
          <ul className="space-y-4 text-lg">
            <li>&gt; Product Guides</li>
            <li>&gt; Wishlists</li>
            <li>&gt; Privacy Policy</li>
            <li>&gt; Store Locator</li>
          </ul>
        </div>

        {/* Newsletter & Search */}
        <div>
          <h3 className="text-xl font-bold mb-6 relative after:block after:w-16 after:h-[3px] after:bg-white after:mt-2">
            Newsletter
          </h3>
          <p className="mb-6 text-lg">Stay Updated with the Latest News</p>

          {/* Newsletter Input */}
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Enter Your Email address"
              className="flex-1 px-4 py-3 text-black bg-white placeholder-gray-500 border border-gray-300 focus:outline-none focus:border-gray-500"
            />
            <button className="bg-gray-700 px-6 py-3 hover:bg-gray-600">
              Submit
            </button>
          </div>

          {/* Search Input */}
     
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-gray-700 mt-10 py-6 text-center text-gray-400 flex flex-col md:flex-row justify-between items-center px-6 text-lg container mx-auto">
        <p>
          Copyright © XStore theme. Created by 8theme –
          <span className="underline"> WordPress WooCommerce themes.</span>
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <img
            src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Payment.svg"
            alt="Payments"
            className="w-50 h-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
