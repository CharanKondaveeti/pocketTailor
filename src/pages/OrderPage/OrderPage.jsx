
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './OrderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, phoneNumber, measurements } = state || {};

  console.log('Received measurements:', measurements); 

 
  const [orders, setOrders] = useState([{ orderDate: '', deliveryDate: '', garmentType: '', measurementOption: '', selectedMeasurement: null }]);

  const garmentTypes = ['Shirt', 'Pants', 'Dress', 'Skirt'];

  const handleBack = () => navigate(-1);

  const handleGarmentTypeChange = (index, e) => {
    const selectedGarment = e.target.value;
    const newOrders = [...orders];
    newOrders[index].garmentType = selectedGarment;

    if (newOrders[index].measurementOption === 'existing') {
      const garmentMeasurements = measurements?.[selectedGarment] || [];
      newOrders[index].selectedMeasurement = garmentMeasurements.length > 0 ? garmentMeasurements[0] : null;
    }

    setOrders(newOrders);
  };

  const handleMeasurementOptionChange = (index, e) => {
    const option = e.target.value;
    const newOrders = [...orders];
    newOrders[index].measurementOption = option;

    if (option === 'new') {
      navigate('/measurements');
    } else {
      const garmentMeasurements = measurements?.[newOrders[index].garmentType] || [];
      newOrders[index].selectedMeasurement = garmentMeasurements.length > 0 ? garmentMeasurements[0] : null;
    }

    setOrders(newOrders);
  };

  const handleInputChange = (index, field, value) => {
    const newOrders = [...orders];
    newOrders[index][field] = value;
    setOrders(newOrders);
  };

  const addOrder = () => {
    setOrders([...orders, { orderDate: '', deliveryDate: '', garmentType: '', measurementOption: '', selectedMeasurement: null }]);
  };

  const getMeasurementDetails = (measurement) => (
    <div className="measurement-details">
      {Object.entries(measurement).map(([key, value]) => (
        <p key={key}>
          {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value} inches`}
        </p>
      ))}
      <button
        className="edit-button"
        onClick={() => navigate('/measurements/edit', { state: { garmentType: measurement.garmentType, measurement } })}
      >
        Edit
      </button>
    </div>
  );

  const handleConfirmOrder = () => {
    alert('Order confirmed!');
    navigate('/dashboard');
  };

  return (
    <div className="order-page">
      <div className="order-top">
        <button onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <h1>Order Page</h1>
      </div>
      <div className='info-container'>
      <img src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729314626/female_lo0lca.jpg" className='profile-photo' alt="image"></img>
      <div className="user-info">
        <p><strong>Name:</strong> {userName || 'N/A'}</p>
        <p><strong>Phone:</strong> {phoneNumber || 'N/A'}</p>
      </div>
      </div>

      {orders.map((order, index) => (
        <div key={index} className="order-entry">
          <div className="form-group">
            <label>Order Date:</label>
            <input
              type="date"
              placeholder='select ordered date'
              value={order.orderDate}
              onChange={(e) => handleInputChange(index, 'orderDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Delivery Date:</label>
            <input
              type="date"
              placeholder='Add Delivery date'
              value={order.deliveryDate}
              onChange={(e) => handleInputChange(index, 'deliveryDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Type of Garment:</label>
            <select value={order.garmentType} onChange={(e) => handleGarmentTypeChange(index, e)}>
              <option value="">Select</option>
              {garmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Measurement Option:</label>
            <select value={order.measurementOption} onChange={(e) => handleMeasurementOptionChange(index, e)}>
              <option value="">Select</option>
              <option value="existing">Choose Existing</option>
              <option value="new">Add New</option>
            </select>
          </div>

          {order.measurementOption === 'existing' && order.selectedMeasurement ? (
            <div className="existing-measurements">
              <h4>Measurement Details:</h4>
              {getMeasurementDetails(order.selectedMeasurement)}
            </div>
          ) : (
            order.measurementOption === 'existing' && order.garmentType && (
              <p>No measurements found for this garment type.</p>
            )
          )}
        </div>
      ))}

      <button className="garment-item" onClick={addOrder}>
        Add Another Garment
      </button>

      <button className="confirm-order-button" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderPage;
