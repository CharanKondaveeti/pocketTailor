import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './OrderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, phoneNumber } = state || {};

  const [orderDate, setOrderDate] = useState('');
  const [garmentType, setGarmentType] = useState('');
  const [measurementOption, setMeasurementOption] = useState('');
  const [selectedMeasurement, setSelectedMeasurement] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const garmentTypes = ['Shirt', 'Pants', 'Dress', 'Skirt'];

  const existingMeasurements = {
    Shirt: [
      { id: 1, neck: '15', chest: '38', waist: '32' },
      { id: 2, neck: '16', chest: '40', waist: '34' },
    ],
    Pants: [
      { id: 3, waist: '32', inseam: '30' },
      { id: 4, waist: '34', inseam: '32' },
    ],
    Dress: [
      { id: 5, bust: '28', waist: '24', length: '36' },
      { id: 6, bust: '30', waist: '26', length: '38' },
    ],
    Skirt: [
      { id: 7, waist: '24', length: '20' },
      { id: 8, waist: '26', length: '22' },
    ],
  };

  const handleBack = () => navigate(-1); // Go back to the previous page

  const handleMeasurementChange = (e) => {
    setSelectedMeasurement(e.target.value);
  };

  const handleAddNewMeasurements = () => {
    navigate('/measurements'); // Redirect to add new measurements
  };

  const getMeasurementDetails = (measurement) => {
    return (
      <div className="measurement-details">
        {Object.entries(measurement)
          .filter(([key]) => key !== 'id')
          .map(([key, value]) => (
            <p key={key}>
              {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value} inches`}
            </p>
          ))}
        <button onClick={handleAddNewMeasurements}>Edit</button>
      </div>
    );
  };

  return (
    <div className="order-page">
      {/* Top Section with Back Button and Heading */}
      <div className="order-top">
        <button onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <h1>Order Page</h1>
      </div>
    
      <img
        src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729314626/female_lo0lca.jpg"
        className='profile-photo'
        alt="image"
      />
           
      <div className="user-info1">
        <p><strong>Name:</strong> {userName || 'N/A'}</p>
        <p><strong>Phone:</strong> {phoneNumber || 'N/A'}</p>
      </div>
      
      {/* Order Date */}
      <div className="form-group">
        <label>Order Date:</label>
        <input
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
      </div>

      {/* Select Garment Type */}
      <div className="form-group">
        <label>Type of Garment:</label>
        <select
          value={garmentType}
          onChange={(e) => {
            setGarmentType(e.target.value);
            setSelectedMeasurement('');
          }}
        >
          <option value="">Select</option>
          {garmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Measurement Option Dropdown */}
      <div className="form-group">
        <label>Measurements:</label>
        <select
          value={measurementOption}
          onChange={(e) => {
            const selectedOption = e.target.value;
            setMeasurementOption(selectedOption);
            if (selectedOption === 'Add New Measurement') {
              handleAddNewMeasurements();
            } else {
              setSelectedMeasurement('');
            }
          }}
        >
          <option value="">Select Measurement Option</option>
          <option value="Use Existing Measurement">Use Existing Measurement</option>
          <option value="Add New Measurement">Add New Measurement</option>
        </select>

        {/* Show Existing Measurements if Selected */}
        {measurementOption === 'Use Existing Measurement' && garmentType && (
          <div className="existing-measurements">
            <label>Select Measurement:</label>
            <select
              value={selectedMeasurement}
              onChange={handleMeasurementChange}
            >
              <option value="">Select</option>
              {existingMeasurements[garmentType]?.map((measurement) => (
                <option key={measurement.id} value={measurement.id}>
                  {`ID: ${measurement.id}`}
                </option>
              ))}
            </select>

            {/* Display Selected Measurement Details with Edit Option */}
            {selectedMeasurement && (
              <>
                <h4>Selected Measurements:</h4>
                {getMeasurementDetails(
                  existingMeasurements[garmentType].find(
                    (m) => m.id === parseInt(selectedMeasurement)
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Delivery Date */}
      <div className="form-group">
        <label>Delivery Date:</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderPage;
