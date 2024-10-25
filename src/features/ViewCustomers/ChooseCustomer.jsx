import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "./ViewCustomers.css";
import { fetchCustomers } from "../../api/customers";

const ChooseCustomer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const {
    data: customers = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const AddClient = () => navigate("/add-client");

  const handleCustomerSelect = (customer) => {
    navigate("/order", {
      state: {
        customerId: customer.id,
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
      <h1 className="heading">Select Customer</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={AddClient}>+ Add Client</button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <table className="customer-table">
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
                  className="customer-row"
                >
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.gender}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-customers">
                  No matching customers found. Click on Add Client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChooseCustomer;
