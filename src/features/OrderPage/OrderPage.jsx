import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MeasurementPopup from "../MeasurementPopup";
import "./OrderPage.css";

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { customerId, userName, phoneNumber, measurements } = state || {};

  const [orders, setOrders] = useState([
    {
      orderDate: "",
      deliveryDate: "",
      garmentType: "",
      measurementOption: "",
      selectedMeasurement: null,
      selectedCategoryMeasurements: null, // To store the measurements of the selected category
      isOpen: true,
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(null);

  const garmentTypes = ["Shirt", "Pants", "Dress", "Skirt"];

  const handleBack = () => navigate(-1);

  const handleGarmentTypeChange = (index, e) => {
    const selectedGarment = e.target.value;
    const newOrders = [...orders];
    newOrders[index].garmentType = selectedGarment;

    if (newOrders[index].measurementOption === "existing") {
      const garmentMeasurements = measurements?.[selectedGarment] || [];
      newOrders[index].selectedMeasurement =
        garmentMeasurements.length > 0 ? garmentMeasurements[0] : null;
    }

    setOrders(newOrders);
  };

  const handleMeasurementOptionChange = (index, e) => {
    const option = e.target.value;
    const newOrders = [...orders];
    newOrders[index].measurementOption = option;

    if (option === "new") {
      navigate("/addmeasurements", {
        state: {
          customerId: customerId,
        },
      });
    } else if (option === "existing") {
      setCurrentOrderIndex(index); // Set the current order index
      setIsPopupOpen(true); // Open the popup
    } else {
      const garmentMeasurements =
        measurements?.[newOrders[index].garmentType] || [];
      newOrders[index].selectedMeasurement =
        garmentMeasurements.length > 0 ? garmentMeasurements[0] : null;
    }

    setOrders(newOrders);
  };

  const handleInputChange = (index, field, value) => {
    const newOrders = [...orders];
    newOrders[index][field] = value;
    setOrders(newOrders);
  };

  const addOrder = () => {
    setOrders([
      ...orders,
      {
        orderDate: "",
        deliveryDate: "",
        garmentType: "",
        measurementOption: "",
        selectedMeasurement: null,
        selectedCategoryMeasurements: null, // Add this here
        isOpen: true,
      },
    ]);
  };

  const handleOkayClick = (index) => {
    const newOrders = [...orders];
    newOrders[index].isOpen = false; // Close the accordion
    setOrders(newOrders);
  };

  const handleOpenClick = (index) => {
    const newOrders = [...orders];
    newOrders[index].isOpen = true; // Open the accordion
    setOrders(newOrders);
  };

  const handleConfirmOrder = () => {
    alert("Order confirmed!");
    navigate("/dashboard");
  };

  const handleMeasurementSelect = (measurement) => {
    const newOrders = [...orders];
    newOrders[currentOrderIndex].selectedMeasurement = measurement;
    setOrders(newOrders);
    setIsPopupOpen(false); // Close the popup
  };

  // Handle selecting a category and its measurements
  const handleCategorySelect = (category) => {
    const newOrders = [...orders];
    const selectedMeasurements = measurements[category] || [];
    newOrders[currentOrderIndex].selectedCategoryMeasurements =
      selectedMeasurements; // Store the measurements
    setOrders(newOrders);
  };

  return (
    <div className="order-page">
      <div className="order-top">
        <button onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <h1>Order Page</h1>
      </div>
      <div className="info-container">
        <img
          src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729314626/female_lo0lca.jpg"
          className="profile-photo"
          alt="image"
        />
        <div className="user-info">
          <p>
            <strong>Name:</strong> {userName || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {phoneNumber || "N/A"}
          </p>
        </div>
      </div>

      {orders.map((order, index) => (
        <div key={index} className="order-entry">
          {order.isOpen ? (
            <div>
              <div className="form-group">
                <label>Order Date:</label>
                <input
                  type="date"
                  value={order.orderDate}
                  onChange={(e) =>
                    handleInputChange(index, "orderDate", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Delivery Date:</label>
                <input
                  type="date"
                  value={order.deliveryDate}
                  onChange={(e) =>
                    handleInputChange(index, "deliveryDate", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Type of Garment:</label>
                <select
                  value={order.garmentType}
                  onChange={(e) => handleGarmentTypeChange(index, e)}
                >
                  <option value="">Select</option>
                  {garmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Measurement Option:</label>
                <select
                  value={order.measurementOption}
                  onChange={(e) => handleMeasurementOptionChange(index, e)}
                >
                  <option value="">Select</option>
                  <option value="existing">Choose Existing</option>
                  <option value="new">Add New</option>
                </select>
              </div>

              {order.selectedCategoryMeasurements && (
                <div className="category-measurements">
                  <h4>Selected Measurements:</h4>
                  <ul>
                    {order.selectedCategoryMeasurements.map(
                      (measurement, idx) => (
                        <li key={idx}>
                          {measurement.label}: {measurement.value}{" "}
                          {measurement.unit}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <button
                className="okay-button"
                onClick={() => handleOkayClick(index)}
              >
                Okay
              </button>
            </div>
          ) : (
            <div className="order-summary">
              <p>
                <strong>Garment:</strong> {order.garmentType || "N/A"} |{" "}
                <strong>Order Date:</strong> {order.orderDate || "N/A"} |{" "}
                <strong>Measurement:</strong>{" "}
                {order.selectedMeasurement
                  ? `${order.selectedMeasurement.label}: ${order.selectedMeasurement.value} ${order.selectedMeasurement.unit}`
                  : "N/A"}
              </p>
              <button
                className="open-button"
                onClick={() => handleOpenClick(index)}
              >
                Open
              </button>
            </div>
          )}
        </div>
      ))}

      <button className="garment-item" onClick={addOrder}>
        Add Another Garment
      </button>

      <button className="confirm-order-button" onClick={handleConfirmOrder}>
        Confirm Order
      </button>

      {isPopupOpen && (
        <MeasurementPopup
          measurements={measurements}
          onSelect={handleMeasurementSelect}
          onClose={() => setIsPopupOpen(false)}
          onCategorySelect={handleCategorySelect} // Pass the new prop
        />
      )}
    </div>
  );
};

export default OrderPage;
