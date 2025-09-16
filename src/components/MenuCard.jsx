// src/components/MenuCard.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const MenuCard = ({ item }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition">
      {/* Left: Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
        <img
          src={
            item.image
              ? `http://localhost:5000${item.image}`
              : "https://via.placeholder.com/150?text=No+Image"
          }
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/150?text=No+Image")
          }
        />
      </div>

      {/* Center: Title & Description */}
      <div className="flex-1 px-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

        {item.description && (
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-2 bg-orange-600 text-white text-sm py-1.5 px-3 rounded-md hover:bg-orange-700 flex items-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      {/* Right: Price */}
      <div className="text-right">
        <p className="text-lg font-bold text-orange-600">₹{item.price}</p>
      </div>
    </div>
  );
};

export default MenuCard;
