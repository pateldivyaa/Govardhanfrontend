// Home.jsx
import React from "react";

const Home = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/home.png')" }}
    >
      {/* Background overlay (fixed your `bg-` class) */}
      <div className="bg-white bg-opacity-5 h-full w-full flex items-center justify-center">
        <div className="text-center px-4">
          {/* Titles */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-2">
            Govardhan
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-8">
            Thal
          </h3>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-black max-w-2xl mx-auto mb-10">
            Discover delectable cuisine and unforgettable moments in our welcoming culinary haven.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booktable">
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1">
                Book A Table
              </button>
            </a>

            <a href="/order">
              <button className="bg-transparent border-2 border-black text-black hover:bg-white hover:text-gray-800 px-6 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1">
                Order Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
