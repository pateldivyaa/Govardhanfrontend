import React from "react";
import { Heart } from "lucide-react";

const foodItems = [
  {
    name: "Delhi Chat",
    price: "$06",
    image: "/images/DelhiChat.jpg",
    discount: null,
  },
  {
    name: "Samosa",
    price: "$08",
    image: "/images/Samosa.jpg",
    discount: null,
  },
  {
    name: "Sev Puri",
    price: "$05",
    originalPrice: "$20.00",
    discount: "-10%",
    image: "/images/SevPuri.jpg",
  },
  {
    name: "Pani Puri",
    price: "$07",
    originalPrice: "$65.00",
    discount: "-15%",
    image: "/images/PaniPuri.jpg",
  },
  {
    name: "Kachori",
    price: "$07",
    originalPrice: "$18.00",
    discount: "-11%",
    image: "/images/Kachori.jpg",
  },
  {
    name: "Ragada Chat",
    price: "$07",
    image: "/images/Ragada.webp",
    discount: null,
  },
  {
    name: "Navtar Samosa",
    price: "$04",
    image: "/images/Navtar.jpg",
    discount: "-14%",
    originalPrice: "$12.00",
  },
  {
    name: "Sev Roll",
    price: "$04",
    image: "/images/SevRoll.jpg",
    discount: null,
  },
];

export default function Toptrending() {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        Top Trending
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sticky Sidebar */}
        <div className="lg:w-1/3 w-full lg:sticky top-10 self-start bg-orange-600 rounded-2xl p-6 text-white h-fit">
          <h2 className="text-lg sm:text-xl font-semibold">Panjabi</h2>
          <p className="text-base sm:text-lg">Recipes For Low Cost</p>
          <a
            href="/menu"
            className="underline mt-3 sm:mt-4 inline-block text-sm sm:text-base"
          >
            LEARN MORE →
          </a>
          <div className="flex justify-center mt-6">
            <img
              src="/images/VegKorma.jpg"
              alt="Sticky Bowl"
              className="rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 object-cover"
            />
          </div>
        </div>

        {/* Food Cards */}
        <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto max-h-[80vh] pr-1 sm:pr-2">
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl relative flex items-center p-3 sm:p-4"
            >
              {/* Discount */}
              {item.discount && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md z-10">
                  {item.discount}
                </div>
              )}
              {/* Heart */}
              <div className="absolute top-2 right-2 z-10">
                <Heart className="w-5 h-5 text-gray-400" />
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover rounded-xl flex-shrink-0"
              />

              {/* Content */}
              <div className="ml-3 flex flex-col justify-between h-full">
                {/* Rating */}
                <div className="flex items-center text-gray-300">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.112 3.42a1 1 0 00.95.69h3.59c.969 0 1.371 1.24.588 1.81l-2.905 2.11a1 1 0 00-.364 1.118l1.112 3.42c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.905 2.11c-.784.57-1.838-.197-1.539-1.118l1.112-3.42a1 1 0 00-.364-1.118l-2.905-2.11c-.783-.57-.38-1.81.588-1.81h3.59a1 1 0 00.95-.69l1.112-3.42z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">(0)</span>
                </div>

                {/* Name */}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mt-1">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-green-600 font-bold text-sm sm:text-base">
                    {item.price}
                  </p>
                  {item.originalPrice && (
                    <p className="line-through text-gray-400 text-xs sm:text-sm">
                      {item.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
