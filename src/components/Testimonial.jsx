import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Jennifer",
    location: "From California",
    image: "/images/user1.png",
    text: `Botanica rice crackers are a staple in my pantry. They are a healthier alternative to traditional crackers and chips, but still satisfy my craving for something spicy and crunchy. Chilli garlic flavor is my personal favorite – it’s so delicious!`,
  },
  {
    name: "David",
    location: "From Texas",
    image: "/images/user2.png",
    text: `Amazing taste and super crispy. I love snacking on these anytime. Highly recommend for health-conscious snackers.`,
  },
  {
    name: "Emily",
    location: "From Florida",
    image: "/images/user3.png",
    text: `Such a refreshing change from regular chips. I especially enjoy them with hummus or guacamole!`,
  },
  {
    name: "Liam",
    location: "From New York",
    image: "/images/user4.png",
    text: `Affordable, crunchy and guilt-free snacking. Everyone in my house loves it.`,
  },
  {
    name: "Ava",
    location: "From Washington",
    image: "/images/user5.png",
    text: `I was skeptical at first, but these crackers are genuinely addictive in the best way possible.`,
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white text-center py-16 mx-4 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url('/images/testibg.png')`,
        backgroundColor: "#fd7200ff", 
        backgroundBlendMode: "multiply", 
      }}
    >
      <h2 className="text-3xl text-white font-bold">Testimonial</h2>
      <p className="uppercase tracking-wider text-sm mt-1">
              What customer say about us
          </p>

      <p className="max-w-3xl mx-auto mt-8 text-lg font-light leading-relaxed px-4">
        "{currentTestimonial.text}"
      </p>

      <div className="flex items-center justify-center gap-3 mt-10 relative">
        <button
          onClick={prev}
          className="bg-white text-red-500 rounded-full p-2 hover:bg-red-200 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-3">
          {testimonials.map((user, idx) => (
            <img
              key={idx}
              src={user.image}
              alt={user.name}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                idx === currentIndex
                  ? "border-white scale-110"
                  : "border-transparent opacity-50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="bg-white text-red-500 rounded-full p-2 hover:bg-red-200 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 text-sm">
        <span className="font-semibold">{currentTestimonial.name}</span> -{" "}
        <span>{currentTestimonial.location}</span>
      </div>

     
      {/* <div className="absolute bottom-0 left-0 w-full">
        <img src="/images/brush-border.svg" alt="decorative" />
      </div>  */}
     
    </section>
  );
}
