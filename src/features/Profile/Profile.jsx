import React from 'react'
import { FaRulerCombined, FaClipboardList,FaFileInvoiceDollar } from 'react-icons/fa';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Profile.css';
import { useNavigate, useLocation } from 'react-router-dom'; 
const Profile=()=>{
    const navigate=useNavigate();
    const { state } = useLocation();
    const back=()=>{
        navigate(-1);
    }
    const { userName, phoneNumber } = state || {};
  return (
    <div className='profile-container'>
        <div className='top'>
        
           <button className='back' onClick={back}> ← Back To Customer List</button>
            <button className='create-order'>+ Create Order</button>
            </div>
        <div className='details-card'>
            <div className='profilephoto-card'>
            <div className='profile'>
                <img src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729314626/female_lo0lca.jpg" className='profile-photo' alt="image"></img>
            </div>
            <div className='icon-container'>
                    <FaEdit className='icon edit-icon' title="Edit" />
                    <FaTrash className='icon delete-icon' title="Delete" />
                </div>
                </div>
           
            <div className='personal-info'>
            <p><strong>Name:</strong> {userName || 'N/A'}</p>
            <p><strong>Phone:</strong> {phoneNumber || 'N/A'}</p>
            </div>
           
        </div>
        
        <div className='card'>
            <div className='measurements'>
                <h3>  <FaRulerCombined style={{ marginRight: '8px',color:'black' }} />Measurements</h3>
                <button className='view-button'>View</button>
            </div>
            <div className='orders'>
                <h3>  <FaClipboardList style={{ marginRight: '8px',color:'black' }} />Orders</h3>
                <button className='view-button'>View</button>
            </div>
            <div className='orders'>
                <h3>  <FaFileInvoiceDollar  style={{ marginRight: '8px',color:'black' }} />Billing</h3>
                <button className='view-button'>View</button>
            </div>
             
        </div>
        

    </div>
  )
}

export default Profile