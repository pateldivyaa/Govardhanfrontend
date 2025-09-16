import React from "react";
import { ShieldCheck, Leaf, Sprout } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={32} className="text-green-600" />,
    title: "Premium Quality",
    desc: "The quality and safety of our products is our top priority. We continue to quest for even greater product quality.",
  },
  {
    id: 2,
    icon: <Leaf size={32} className="text-green-600" />,
    title: "Always Fresh",
    desc: "Botanica Shop is always committed to 100% fresh, organic food with certification of food safety.",
  },
  {
    id: 3,
    icon: <Sprout size={32} className="text-green-600" />,
    title: "Organic Farming",
    desc: "Agricultural system that uses ecologically based pest controls and natural fertilizers derived from animals.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute top-14 left-0 right-0 border-t-2 border-dotted border-green-400 z-0"></div>

          {features.map((feature, idx) => (
            <div key={idx} className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-white shadow-lg">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
