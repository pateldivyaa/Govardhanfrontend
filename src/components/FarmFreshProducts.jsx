import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ShoppingBasket } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Green Broccoli",
    price: "$8.00",
    oldPrice: "$9.00",
    discount: "-11%",
    image: "/images/green.png",
  },
  {
    id: 2,
    name: "Purple Onion",
    price: "$10.00",
    oldPrice: "$12.00",
    discount: "-17%",
    countdown: { days: 130, hours: 4, mins: 57, secs: 55 },
    image: "/images/green.png",
  },
  {
    id: 3,
    name: "Chile Bell Pepper",
    price: "$18.00",
    image: "/images/green.png",
  },
  {
    id: 4,
    name: "Green Cabbage",
    price: "$15.00",
    image: "/images/green.png",
  },
  {
    id: 5,
    name: "Chicken Skewers",
    price: "$22.00",
    status: "SOLD OUT",
    image: "/images/green.png",
  },
];

const FarmFreshProducts = () => {
  return (
    <section className="py-16 bg-pink-100 relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-repeat"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Farm Fresh Products</h2>
          <div className="flex justify-center gap-6 mt-4">
            {["Vegetable", "Fruits", "Drink", "Bee Products"].map((cat, idx) => (
              <button
                key={idx}
                className={`text-lg font-medium ${
                  idx === 0
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden relative group">
                {/* Discount or Sold out badge */}
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.discount}
                  </span>
                )}
                {product.status && (
                  <span className="absolute top-3 left-3 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                    {product.status}
                  </span>
                )}

                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />

                  {product.countdown && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/50 px-3 py-1 rounded-lg">
                      {Object.entries(product.countdown).map(([label, value], idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-white text-xs"
                        >
                          <span className="font-bold text-sm">{value}</span>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <button className="p-2 rounded-full hover:bg-green-100">
                      <ShoppingBasket className="text-green-600" size={20} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 font-bold">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through ml-2">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FarmFreshProducts;
