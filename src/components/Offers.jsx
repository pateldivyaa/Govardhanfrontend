import React from "react";
import { Store } from "lucide-react"; 

const offers = [
  {
    id: 1,
    name: "Gujarati Thali",
    price: "$12",
    image: "https://media.istockphoto.com/id/476837561/photo/gujarati-thali.jpg?s=612x612&w=0&k=20&c=kLyf3PIjJ2p964z8kKSZ6IOpMrQz6-JsUQ-fEGx_NJk=",
  },
  {
    id: 2,
    name: "Panjabi Thali",
    price: "$12",
    image: "https://media.istockphoto.com/id/1476234160/photo/magnificent-view-of-paneer-gulab-jamun-and-halwa-in-rajasthani-plate.jpg?s=612x612&w=0&k=20&c=5RL7gaLv64iUVRp1tYyQx8NhRwl_X-a76VS_cdCi_ck=",
  },
  {
    id: 3,
    name: "Gujarati Mini",
    price: "$08",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTup_eN1aj3UErbnqTAsrtNoHSVtCF4TRaZtQ&s",
  },
  {
    id: 4,
    name: "Rajasthani Thali",
    price: "$12",
    image: "https://www.enhanceyourpalate.com/wp-content/uploads/Dal-Bati-Churma-3333.jpg?v=1569173780",
  },
  {
    id: 5,
    name: "Sp. Govardhan Thali",
    price: "$16",
    image: "https://b.zmtcdn.com/data/reviews_photos/71c/9ff12f2e74d316dade7c374796e5871c_1505141603.jpg?fit=around|750:500&crop=750:500;*,*",
  },
];

const Offers = () => {
  return (
    <section className="py-12 relative">
      <h2 className="text-center text-2xl font-semibold mb-10">
        Top Offers This Week
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden group"
          >
            <div className="relative">
              <img
                src={offer.image}
                alt={offer.name}
                className="h-48 w-full object-cover"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white rounded-full p-3 shadow-lg group-hover:bg-green-700 transition">
                <Store size={22} />
              </div>
            </div>

            <div className="text-center mt-8 mb-4">
              <p className="text-green-600 font-semibold">{offer.price}</p>
              <p className="text-gray-700 font-medium">{offer.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/3 left-6 opacity-60">
        {/* <img
          src="https://cdn-icons-png.flaticon.com/128/3082/3082031.png"
          alt="decoration"
          className="w-14"
        /> */}
      </div>
      <div className="absolute top-1/3 right-6 opacity-60">
        {/* <img
          src="https://cdn-icons-png.flaticon.com/128/415/415733.png"
          alt="decoration"
          className="w-14"
        /> */}
      </div>
    </section>
  );
};

export default Offers;
