import React, { useState } from "react";
import {
  FaFileInvoiceDollar,
  FaShoppingCart,
  FaUsers,
  FaTshirt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [activeList, setActiveList] = useState(null);

  const handleOrders = () => {
    navigate("/view");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to set active list based on button clicked
  const handleListChange = (listType) => {
    setActiveList(listType);
  };

  function whenCardClicked(route) {
    navigate(`/${route}`);
  }

  // Render items based on activeList
  const renderList = () => {
    switch (activeList) {
      case "urgent":
        return <p>Urgent orders list</p>;
      case "active":
        return <p>Active orders list</p>;
      case "completed":
        return <p>Completed orders list</p>;
      case "canceled":
        return <p>Canceled orders list</p>;
      default:
        return <p>Please select an option above to view the list.</p>;
    }
  };

  return (
    <section className="dashboard-container section">
      <header className="dashboard-header">
        <div className="bar">
          <h1>PocketTailor</h1>

          <div className="menu-container">
            {showMenu ? (
              <FaTimes className="menu-icon" onClick={toggleMenu} />
            ) : (
              <FaBars className="menu-icon" onClick={toggleMenu} />
            )}
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
      </header>
      <div className="services-cards">
        <div
          className="service-EachCard"
          onClick={() => whenCardClicked("addorder")}
        >
          <FaPlus className="card-icon" />
          <h3>add order</h3>
        </div>

        <div className="service-EachCard">
          <FaUsers className="card-icon" />
          <h3>Customers</h3>
        </div>

        <div className="service-EachCard">
          <FaFileInvoiceDollar className="card-icon" />
          <h3>Orders</h3>
        </div>

        <div className="service-EachCard">
          <FaTshirt className="card-icon" />
          <h3>Products</h3>
        </div>
      </div>
      {/* Options Section */}
      <div className="options-container">
        <button onClick={() => handleListChange("urgent")}>Urgent</button>
        <button onClick={() => handleListChange("active")}>Active</button>
        <button onClick={() => handleListChange("completed")}>Completed</button>
        {/* <button onClick={() => handleListChange("canceled")}>Canceled</button> */}
      </div>
      {/* Render List Section */}
      <div className="list-container">{renderList()}</div>
    </section>
  );
};

export default Dashboard;
