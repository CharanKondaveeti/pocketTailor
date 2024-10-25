import { useState } from "react";
import { FaUser, FaPhone, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomer } from "../../api/customers";
import "./AddCustomer.css";

const AddCustomer = () => {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addClientMutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      navigate("/choosecustomer");
    },
    onError: (error) => {
      console.error("Error adding client:", error);
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newClient = {
      name: clientName,
      phone: phoneNumber,
      gender: gender,
      measurements: {},
    };

    addClientMutation.mutate(newClient);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <form className="client-container" onSubmit={handleFormSubmit}>
      <div className="client-top">
        <button type="button" onClick={handleBackClick}>
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
          required
        />
      </div>

      <div className="client-fields">
        <FaPhone className="input-icon" />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
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
        <button type="submit" disabled={addClientMutation.isLoading}>
          {addClientMutation.isLoading ? "Adding..." : "Next"}
        </button>
      </div>

      {addClientMutation.isError && (
        <p className="error">
          Error adding client: {addClientMutation.error.message}
        </p>
      )}
    </form>
  );
};

export default AddCustomer;
