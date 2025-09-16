// ./pages/Order.jsx
import React, { useEffect, useState } from "react";
import { ClipboardList, ShoppingBag, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext"; // ✅ assuming you store logged-in user here

const Order = () => {
  const navigate = useNavigate();
  const { user } = useAppContext(); // logged-in customer
  const [activeTab, setActiveTab] = useState("current");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Orders - Govardhan Thal";
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders?customerId=${user?._id}`
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Server error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusColor = (status) => {
    if (status === "ready") return "text-green-600";
    if (status === "pending" || status === "preparing")
      return "text-yellow-600";
    return "text-gray-600";
  };

  const getStatusIcon = (status) => {
    if (status === "ready")
      return <CheckCircle size={18} className="text-green-600" />;
    if (status === "pending" || status === "preparing")
      return <Clock size={18} className="text-yellow-600" />;
    return null;
  };

  // ✅ Separate current vs history
  const currentOrder = orders.find(
    (o) => o.status === "pending" || o.status === "preparing"
  );
  const historyOrders = orders.filter(
    (o) => o.status !== "pending" && o.status !== "preparing"
  );

  return (
    <div className="bg-orange-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab("current")}
              className={`py-2 px-4 font-medium ${
                activeTab === "current"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Current Order
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-2 px-4 font-medium ${
                activeTab === "history"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Order History
            </button>
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-gray-500 text-center py-8">Loading orders...</p>
          )}

          {/* Current Order */}
          {activeTab === "current" && !loading && (
            <div>
              {currentOrder ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold">
                          Order #{currentOrder._id.substring(0, 6)}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Placed on {formatDate(currentOrder.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(currentOrder.status)}
                        <span
                          className={`font-medium ${getStatusColor(
                            currentOrder.status
                          )}`}
                        >
                          {currentOrder.status === "ready"
                            ? "Ready for pickup"
                            : "Preparing"}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <h3 className="font-semibold mb-2">Items:</h3>
                      <div className="space-y-2">
                        {currentOrder.items.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <p>
                              {item.name}{" "}
                              <span className="text-gray-500">
                                x{item.quantity}
                              </span>
                            </p>
                            <p className="font-medium">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total + Payment */}
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-orange-600">
                        ₹{currentOrder.total.toFixed(2)}
                      </span>
                    </div>

                    {/* Customer */}
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                      <div>
                        <p>
                          <span className="text-gray-500">Name:</span>{" "}
                          {currentOrder.customerName}
                        </p>
                        <p>
                          <span className="text-gray-500">Table:</span>{" "}
                          {currentOrder.tableNumber}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`py-1 px-3 rounded-full text-sm ${
                            currentOrder.isPaid
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {currentOrder.isPaid ? "Paid" : "Payment Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <ShoppingBag
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    No Current Order
                  </h2>
                  <p className="text-gray-500 mb-6">
                    You don't have any ongoing orders right now.
                  </p>
                  <button
                    onClick={() => navigate("/menu")}
                    className="py-2 px-6 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Order History */}
          {activeTab === "history" && !loading && (
            <div>
              {historyOrders.length > 0 ? (
                <div className="space-y-6">
                  {historyOrders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-xl font-bold">
                              Order #{order._id.substring(0, 6)}
                            </h2>
                            <p className="text-sm text-gray-500">
                              Placed on {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span
                              className={`font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="border-t border-gray-200 pt-4 mb-4">
                          <h3 className="font-semibold mb-2">Items:</h3>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between">
                                <p>
                                  {item.name}{" "}
                                  <span className="text-gray-500">
                                    x{item.quantity}
                                  </span>
                                </p>
                                <p className="font-medium">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Total + Payment */}
                        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                          <span className="font-semibold">Total Amount:</span>
                          <span className="text-xl font-bold text-orange-600">
                            ₹{order.total.toFixed(2)}
                          </span>
                        </div>

                        {/* Customer */}
                        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                          <div>
                            <p>
                              <span className="text-gray-500">Name:</span>{" "}
                              {order.customerName}
                            </p>
                            <p>
                              <span className="text-gray-500">Table:</span>{" "}
                              {order.tableNumber}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`py-1 px-3 rounded-full text-sm ${
                                order.isPaid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.isPaid ? "Paid" : "Payment Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <ClipboardList
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    No Order History
                  </h2>
                  <p className="text-gray-500 mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <button
                    onClick={() => navigate("/menu")}
                    className="py-2 px-6 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
