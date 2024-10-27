import React, { useState } from "react";
import {
  FaFileInvoiceDollar,
  FaShoppingCart,
  FaUsers,
  FaTshirt,
  FaBars,
} from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleOrders = () => {
    navigate("/choosecustomer");
  };

  const handleCustomers = () => {
    navigate("/view");
  };

  const handleLogout = () => {
    navigate("/login");
  };
  const handleBilling=()=>
  {
    navigate('/billing');
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="bar">
          <h1>Welcome to Pocket Tailor</h1>

          <div className="menu-container">
            <FaBars className="menu-icon" onClick={toggleMenu} />
            {showMenu && (
              <div className="menu-dropdown">
                <button
                  className="logout-button"
                  style={{ background: "none", border: "none" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729576586/tailor_qhvby4.jpg"
          alt="Pocket Tailor Logo"
          className="dashboard-image"
        />
      </header>

      <div className="cards-container">
        <h1>Services</h1>
        <div className="card" onClick={handleBilling}>
          <FaFileInvoiceDollar className="card-icon" />
          Billing
        </div>
        <div className="card" onClick={handleOrders}>
          <FaShoppingCart className="card-icon" />
          Orders
        </div>
        <div className="card" onClick={handleCustomers}>
          <FaUsers className="card-icon" />
          Customers
        </div>
        <div className="card">
          <FaTshirt className="card-icon" />
          Unstitched Clothes
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
