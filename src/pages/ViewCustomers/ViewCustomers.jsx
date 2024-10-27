import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Viewcustomers.css';

const Viewcustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const jsonData = [
    {
      id: 1,
      name: 'John Doe',
      phone: '1234567890',
      gender: 'Male',
      measurements: {
        Shirt: [{ id: 1, neck: '15', chest: '38', waist: '32' }],
        Pants: [{ id: 2, waist: '32', inseam: '30' }],
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '0987654321',
      gender: 'Female',
      measurements: {
        Dress: [{ id: 3, bust: '28', waist: '24', length: '36' }],
        Skirt: [{ id: 4, waist: '26', length: '22' }],
      },
    },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
  ];

  useEffect(() => {
    setCustomers(jsonData);
  }, []);

 

  const handleCustomerSelect = (customer) => {
    navigate('/profile', {
      state: {
        userName: customer.name,
        phoneNumber: customer.phone,
        measurements: customer.measurements || {}, 
      },
    });
  };
  
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.gender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
     
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => handleCustomerSelect(customer)}
                style={{ cursor: 'pointer' }}
              >
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No matching customers found. </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Viewcustomers;



