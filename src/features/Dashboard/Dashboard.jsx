import React from 'react';
import { FaFileInvoiceDollar, FaShoppingCart, FaUsers, FaTshirt } from 'react-icons/fa'; 
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate();
    const handleorders=()=>
    {
        navigate('/view');
    }
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome to Pocket Tailor</h1>
                <img 
                    src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729576586/tailor_qhvby4.jpg" 
                    alt="Pocket Tailor Logo" 
                    className="dashboard-image" 
                />
            </header>

            <div className="cards-container">
                <h1>Services</h1>
                <div className="card">
                    <FaFileInvoiceDollar className="card-icon" />
                    Billing
                </div>
                <div className="card" onClick={handleorders}>
                    <FaShoppingCart className="card-icon" />
                    Orders
                </div>
                <div className="card">
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
