import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanelLayout from './admin/AdminPanelLayout';
import AdminDashboard from './admin/AdminDashboard';
import ReservationsPage from './admin/ReservationsPage';
import OrdersPage from './admin/OrdersPage';
import User from './admin/User';
// import MenuPage from './admin/MenuPage';   
import Adminmenu from './admin/AdminMenu';
import InventoryPage from './admin/InventoryPage';


// import AnalyticsPage from './admin/AnalyticsPage';
// import { User } from 'lucide-react';

const AdminDashboardPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === "adminlogout") {
      // ✅ Clear localStorage
      localStorage.removeItem("govardhanthal_admin_authenticated");
      // ✅ Redirect to login
      navigate("/admin/adminlogin");
      return;
    }
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'orders':
        return <OrdersPage />;
      case 'reservations':
        return <ReservationsPage />;
      case 'user':
        return <User />;
      case 'menu':                           // ✅ Menu case added
        return <Adminmenu />;
      case 'inventory':     // ✅ New Inventory case
        return <InventoryPage />;
      // case 'analytics':/
      // return <AnalyticsPage />;
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <AdminPanelLayout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderContent()}
    </AdminPanelLayout>
  );
};

export default AdminDashboardPage;
