import React from 'react'
import { FaUser } from 'react-icons/fa';
import './AddClient.css'
function AddClient() {
  return (
    <div className='newclient-container'>
        <div className='newclient-top'>
            <button>vbn</button>
            <h3 >New Client</h3>
        </div>
        <div className='client-info'>
        <FaUser className="username-icon" />
    <input type="text" placeholder="Enter Username" className="username-input" />
  </div>
  
</div>
       
  )
}

export default AddClient