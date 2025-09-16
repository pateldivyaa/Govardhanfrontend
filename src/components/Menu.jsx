// ./pages/Menu.jsx
import React, { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight, Minus, Plus, Menu as MenuIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const { getMenuItems, cart, removeFromCart, updateCartItemQuantity } =
    useAppContext();
  const [menu, setMenu] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Menu - Govardhan Thal";
    const defaultCats = [
      "Welcome Drinks",
      "Milk Shake",
      "Raita",
      "Rice",
      "Thali",
      "Gujarati Sabzi",
      "Punjabi Sabzi",
      "South Indian",
      "Chinese",
      "Snacks",
      "Desserts",
    ];
    setMenuCategories(defaultCats);
    setActiveCategory(defaultCats[0]);

    // ✅ fetch menu items from backend
    getMenuItems()
      .then((res) => {
        if (res.ok) {
          setMenu(res.data || []);
        }
      })
      .catch(() => toast.error("Failed to fetch menu"));
  }, []);

  // ✅ filter by category
  const filteredItems = menu.filter(
    (item) => item.category?.trim() === activeCategory.trim()
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart empty");
      return;
    }
    navigate("/orderconfirmationpage");
  };

  return (
    <>
      <div className="flex bg-white min-h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-orange-600 text-white flex-shrink-0">
          <div className="py-10 px-6">
            <h2 className="text-2xl font-bold text-black mb-8">Menu</h2>
            <ul className="space-y-6">
              {menuCategories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left font-medium ${
                      activeCategory === cat
                        ? "text-black"
                        : "text-white hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar - Mobile Drawer */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`fixed top-0 left-0 bottom-0 w-64 bg-orange-600 text-white z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:hidden`}
        >
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className="px-6 space-y-6">
            {menuCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                    setIsSidebarOpen(false);
                  }}
                  className={`block w-full text-left font-medium ${
                    activeCategory === cat
                      ? "text-black"
                      : "text-white hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 md:px-10 py-12">
          {/* Mobile Menu Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded flex items-center space-x-2"
            >
              <MenuIcon size={20} />
              <span>Categories</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
            Foodige Menu
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 md:mt-12 space-x-2 md:space-x-4 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center space-x-2"
      >
        <ShoppingBag size={20} /> <span>{cart.length}</span>
      </button>

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/3 bg-white shadow-xl z-50 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[70vh]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-3 flex-grow">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {item.description}
                  </p>
                  <p className="text-orange-600 font-bold">₹{item.price}</p>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="p-1"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity + 1)
                      }
                      className="p-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="ml-2 text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-6 bg-gray-50 border-t">
          <p className="font-bold">Subtotal: ₹{cartTotal.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="mt-3 w-full bg-orange-600 text-white py-2 rounded flex justify-center items-center space-x-2"
          >
            <ArrowRight size={16} /> <span>Checkout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
