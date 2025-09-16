import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";

const deals = [
  {
    id: 1,
    title: "Gujarati Thali",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed dui tempor eros porttitor.",
    price: "$04",
    image: "/images/gujarati.png",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    bgColor: "bg-orange-200",
  },
  {
    id: 2,
    title: "Rajasthani Thali",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed dui tempor eros porttitor.",
    price: "$19.00",
    image: "/images/rajasthani.png",
    buttonColor: "bg-green-600 hover:bg-green-700",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Sp. Govardhan Thali",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed dui tempor eros porttitor.",
    price: "$12.00",
    image: "/images/govardhan.png",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    bgColor: "bg-purple-100",
  },
];

const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

const WeekendDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Weekend Deals</h2>
        <p className="text-green-600 font-medium mt-2 text-sm sm:text-base">
          Hurry up!!! Limited time offer
        </p>

        {/* Timer */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mt-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.mins },
            { label: "Secs", value: timeLeft.secs },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-orange-600 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 justify-center shadow-lg"
            >
              <span className="text-base sm:text-lg font-bold">{item.value}</span>
              <span className="text-[10px] sm:text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto"
      >
        {deals.map((deal) => (
          <SwiperSlide key={deal.id}>
            <div
              className={`relative ${deal.bgColor} rounded-2xl flex flex-col sm:flex-row items-center sm:items-center justify-between px-6 sm:px-10 md:px-20 py-6 sm:py-8 gap-6`}
            >
              {/* Left content */}
              <div className="max-w-full sm:max-w-sm text-center sm:text-left">
                <p className="uppercase text-xs sm:text-sm tracking-wide text-gray-500">
                  Weekend Deals
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {deal.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{deal.desc}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-3 sm:mt-4">
                  {deal.price}
                </p>

                <button
                  className={`mt-4 ${deal.buttonColor} text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full flex items-center gap-2 mx-auto sm:mx-0 text-sm sm:text-base`}
                >
                  SHOP NOW <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Right image */}
              <div className="flex justify-center sm:justify-end">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full object-cover shadow-md"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WeekendDeals;
