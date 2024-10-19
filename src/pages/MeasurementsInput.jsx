import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  FaRuler,
  FaTshirt,
  FaArrowsAltV,
  FaChild,
  FaHandPointDown,
} from "react-icons/fa";
import "./css/MeasurementsInput.css";
import Experiments from "../Experiments";

const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const MeasurementsInput = () => {
  const [fields, setFields] = useState([
    { label: "Shoulder Width", icon: <FaArrowsAltV />, value: "" },
    { label: "Chest", icon: <FaTshirt />, value: "" },
    { label: "Waist", icon: <FaRuler />, value: "" },
    { label: "Hip", icon: <FaChild />, value: "" },
    { label: "Arm Hole", icon: <FaHandPointDown />, value: "" },
    { label: "Sleeve Length", icon: <FaArrowsAltV />, value: "" },
    { label: "Wrist", icon: <FaArrowsAltV />, value: "" },
    { label: "Waist Bottom", icon: <FaRuler />, value: "" },
    { label: "Hip Bottom", icon: <FaChild />, value: "" },
    { label: "Knee", icon: <FaArrowsAltV />, value: "" },
    { label: "Ankle", icon: <FaArrowsAltV />, value: "" },
  ]);

  const addField = () => {
    const newField = { label: "New Field", icon: <FiPlus />, value: "" };
    setFields([...fields, newField]);
  };

  const handleChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  return (
    <div className="measurements-container">
      <h2>Enter Measurements</h2>
      <div className="measurements-grid">
        {fields.map((field, index) => (
          <div key={index} className="measurement-field">
            <span className="icon">{field.icon}</span>
            <label>{field.label}</label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
        {fields.map((field, index) => (
          <div key={index} className="measurement-field">
            <span className="icon">{field.icon}</span>
            <label>{field.label}</label>
            <div className="scroll-input">
              <Experiments options={options} />
              <p>.</p>
              <Experiments options={options} />
            </div>
          </div>
        ))}
      </div>
      <button className="add-field-btn" onClick={addField}>
        <FiPlus /> Add Extra Field
      </button>
    </div>
  );
};

export default MeasurementsInput;
