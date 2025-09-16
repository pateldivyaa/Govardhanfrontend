import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Offers from './components/Offers';
import WeekendDeals from './components/WeekendDeals';
import Features from './components/Features';
import SignatureDishes from './components/SignatureDishes';
import Toptrending from './components/Toptrending';
import Testimonial from './components/Testimonial';
import FooterNewsletter from './components/FooterNewsletter';
import About from './components/About';
import BookTable from './components/Booktable';
import Order from './components/Order';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Adminlogin from './components/Adminlogin';
import AdminDashboardPage from './components/AdminDashboardPage';
import OrdersPage from './components/admin/OrdersPage';
import ReservationsPage from './components/admin/ReservationsPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
// import AdminHomepage from './components/AdminHomepage';

function Layout({ children }) {
  const location = useLocation();

  // hide header & footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="font-sans">
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <FooterNewsletter />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Offers />
                <WeekendDeals />
                <Features />
                <SignatureDishes />
                <Toptrending />
                <Testimonial />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/booktable" element={<BookTable />} />
          <Route path="/order" element={<Order />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/adminlogin" element={<Adminlogin />} />
          <Route path="/admindashboardpage" element={<AdminDashboardPage />} />
          <Route path="/adminorders" element={<OrdersPage />} />
          <Route path="/adminreservations" element={<ReservationsPage />} />
          <Route path="/orderconfirmationpage" element={<OrderConfirmationPage/>} />
          {/* <Route path="/adminanalytics" element={<AdminDashboardPage/>} /> */}
          <Route path="/admindashboardpage" element={<AdminDashboardPage />} />
        </Routes>
        <ToastContainer position="top-center" newestOnTop closeOnClick pauseOnHover={false} />
      </Layout>
    </Router>
  );
}

export default App;
