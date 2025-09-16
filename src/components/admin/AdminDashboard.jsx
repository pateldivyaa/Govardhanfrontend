import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Calendar,
  Package,
  DollarSign,
  TrendingUp,
  Users,
  Bell,
  Settings,
  Eye,
  Edit,
} from "lucide-react";

const AdminDashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [todaysReservations, setTodaysReservations] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setRecentOrders(data.recentOrders || []);
        setTodaysReservations(data.todaysReservations || []);
      })
      .catch((err) =>
        console.error("❌ Error fetching dashboard data:", err)
      );
  }, []);

  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      name: "Orders Today",
      value: "89",
      change: "+12%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      name: "Active Tables",
      value: "24",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
    {
      name: "Avg. Wait Time",
      value: "12 min",
      change: "-5%",
      changeType: "negative",
      icon: Calendar,
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
    },
    {
      name: "Reservations",
      value: "156",
      change: "+15%",
      changeType: "positive",
      icon: Calendar,
      color: "bg-gradient-to-r from-pink-400 to-pink-600",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Preparing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border hover:shadow-md transition-shadow">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        stat.changeType === "positive"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Orders
              </h2>
              <a href="/orders">
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View All
                </button>
              </a>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {order.name
                          ? order.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "NA"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} items •{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-900">
                      ₹{order.total}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status || "Pending"
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Reservations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Today's Reservations
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todaysReservations.map((reservation, index) => (
                <div
                  key={reservation._id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-200 hover:bg-orange-50 transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {reservation.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {reservation.time} • {reservation.partySize} people
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600">
                      {reservation.tableNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      Table {reservation.tableNumber}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/reservations">
              <button className="w-full mt-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                View All Reservations
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
