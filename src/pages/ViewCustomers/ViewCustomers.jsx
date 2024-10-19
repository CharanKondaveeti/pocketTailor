import React, { useState, useEffect }
 from 'react';
 import { useNavigate } from 'react-router-dom';
import './ViewCustomers.css'
const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
 
  const jsonData = [
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    { id: 1, name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, name: 'Sam Wilson', phone: '5551234567', gender: 'Male' },
    
  ];


  useEffect(() => {
  
    setCustomers(jsonData);
  }, []);
  const AddClient=()=>{
    navigate('/add-client');

  }


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
        <button onClick={AddClient}>+ Add Client</button>
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
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No matching customers found.click on Add Client</td>
             
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomers;
