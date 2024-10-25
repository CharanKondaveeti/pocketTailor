import React, { useState } from "react";
import { FaUser, FaPhone, FaArrowLeft } from "react-icons/fa";
import "./AddClient.css";
import { useNavigate } from "react-router-dom";
const NewClientForm = () => {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const back = () => {
    navigate("/view");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log({
      clientName,
      phoneNumber,
      gender,
    });
  };

  return (
    <form className="client-container">
      <div className="client-top">
        <button onClick={back} type="button">
          <FaArrowLeft />
        </button>
        <h2>New Client</h2>
      </div>

      <div className="client-fields">
        <FaUser className="input-icon" />
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      <div className="client-fields">
        <FaPhone className="input-icon" />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="gender-selection">
        <label className="gender-label">Select Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={() => setGender("Male")}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={() => setGender("Female")}
            />
            Female
          </label>
        </div>
      </div>

      <div className="submit-button">
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default NewClientForm;
