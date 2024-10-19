import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const OrderPage = () => {
  const history = useHistory();
  
  const [orderDate, setOrderDate] = useState('');
  const [garmentType, setGarmentType] = useState('');
  const [useExistingMeasurements, setUseExistingMeasurements] = useState(true);
  const [selectedMeasurement, setSelectedMeasurement] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  
  const existingMeasurements = {
    Shirt: [
      { id: 1, neck: '15', chest: '38', waist: '32' },
      { id: 2, neck: '16', chest: '40', waist: '34' },
    ],
    Pants: [
      { id: 3, waist: '32', inseam: '30' },
      { id: 4, waist: '34', inseam: '32' },
    ],
  };

  const garmentTypes = ['Shirt', 'Pants']; 

  const handleMeasurementChange = (e) => {
    setSelectedMeasurement(e.target.value);
  };

  const handleAddNewMeasurements = () => {
    history.push('/add-new-measurements'); 
  };

  return (
    <div className="order-page">
      <h1>Order Page</h1>
      <button onClick={() => history.goBack()}>Back</button>
      
      <div>
        <label>Order Date:</label>
        <input 
          type="date" 
          value={orderDate} 
          onChange={(e) => setOrderDate(e.target.value)} 
        />
      </div>

      <div>
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
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Measurements:</label>
        <div>
          <label>
            <input 
              type="radio" 
              name="measurementOption" 
              value="existing" 
              checked={useExistingMeasurements} 
              onChange={() => setUseExistingMeasurements(true)} 
            />
            Use Existing Measurement
          </label>

          <label>
            <input 
              type="radio" 
              name="measurementOption" 
              value="new" 
              checked={!useExistingMeasurements} 
              onChange={() => {
                setUseExistingMeasurements(false);
                handleAddNewMeasurements(); 
              }} 
            />
            Add New Measurement
          </label>
        </div>

        {useExistingMeasurements && garmentType && (
          <div>
            <label>Select Measurement:</label>
            <select 
              value={selectedMeasurement} 
              onChange={handleMeasurementChange}
            >
              <option value="">Select</option>
              {existingMeasurements[garmentType]?.map((measurement) => (
                <option key={measurement.id} value={measurement.id}>
                  {`ID: ${measurement.id} - Neck: ${measurement.neck} - Chest: ${measurement.chest} - Waist: ${measurement.waist}`}
                </option>
              ))}
            </select>
            {selectedMeasurement && (
              <div>
                <h4>Selected Measurements:</h4>
              <p>Neck:{existingMeasurements[garmentType].find(m => m.id === parseInt(selectedMeasurement)).neck} inches</p>
                <p>Chest:{existingMeasurements[garmentType].find(m => m.id === parseInt(selectedMeasurement)).chest} inches</p>
                <p>Waist:{existingMeasurements[garmentType].find(m => m.id === parseInt(selectedMeasurement)).waist} inches</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
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
