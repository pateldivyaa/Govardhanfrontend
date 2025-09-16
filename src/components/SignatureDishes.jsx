import React from "react";
import { Link } from "react-router-dom";


const dishes = [
  {
    id: 1,
    name: "Undhiyu",
    gujarati: "ઉંધિયું",
    description:
      "A traditional Gujarati mixed vegetable dish, typically prepared in earthen pots.",
    price: "$12",
    image:
      "/images/undhiyu.png",
  },
  {
    id: 2,
    name: "Rajma",
    gujarati: "સ્પે. ગોવર્ધન થાળી",
    description:
      "Our signature unlimited thali with authentic Gujarati dishes including sweets, farsan, and more.",
    price: "$15",
    image: "/images/rajma.jpg",
  },
  {
    id: 3,
    name: "Jalebi",
    gujarati: "કેસર લસ્સી",
    description:
      "Traditional yogurt-based drink flavored with saffron, cardamom, and topped with nuts.",
    price: "$15",
    image: "/images/image.png",
  },
];

const SignatureDishes = () => {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Our Signature Dishes
        </h2>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
            >
              {/* Image with zoom effect */}
              <div className="overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-left">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {dish.name}
                  </h3>
                  <span className="text-red-500 font-bold">{dish.price}</span>
                </div>
                {/* <p className="text-orange-600 text-sm">{dish.gujarati}</p> */}
                <p className="text-gray-600 text-sm mt-2">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <a href="/menu">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
          Explore Full Menu
        </button>
        </a>
      </div>
    </section>
  );
};

export default SignatureDishes;
