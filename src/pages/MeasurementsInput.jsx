import React, { useState } from "react";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import {
  FaRuler,
  FaTshirt,
  FaArrowsAltV,
  FaChild,
  FaHandPointDown,
} from "react-icons/fa";
import "./css/MeasurementsInput.css";
import Experiments from "../Experiments";

const wholeNumberOptions = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
];
const decimalOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const MeasurementsInput = () => {
  const [fields, setFields] = useState([
    { label: "Shoulder Width", icon: <FaArrowsAltV />, value: "00.0" },
    { label: "Chest", icon: <FaTshirt />, value: "00.0" },
    { label: "Waist", icon: <FaRuler />, value: "00.0" },
    { label: "Hip", icon: <FaChild />, value: "00.0" },
    { label: "Arm Hole", icon: <FaHandPointDown />, value: "00.0" },
    { label: "Sleeve Length", icon: <FaArrowsAltV />, value: "00.0" },
    { label: "Wrist", icon: <FaArrowsAltV />, value: "00.0" },
    { label: "Waist Bottom", icon: <FaRuler />, value: "00.0" },
    { label: "Hip Bottom", icon: <FaChild />, value: "00.0" },
    { label: "Knee", icon: <FaArrowsAltV />, value: "00.0" },
    { label: "Ankle", icon: <FaArrowsAltV />, value: "00.0" },
  ]);

  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [measurementName, setMeasurementName] = useState("Measurement Name");

  const handleFieldClick = (index) => {
    setSelectedFieldIndex(index);
  };

  const handleWholeNumberChange = (value) => {
    if (selectedFieldIndex !== null) {
      const newFields = [...fields];
      const [, decimal] = newFields[selectedFieldIndex].value.split(".");
      newFields[selectedFieldIndex].value = `${value}.${decimal}`;
      setFields(newFields);
    }
  };

  const handleDecimalChange = (value) => {
    if (selectedFieldIndex !== null) {
      const newFields = [...fields];
      const [whole] = newFields[selectedFieldIndex].value.split(".");
      newFields[selectedFieldIndex].value = `${whole}.${value}`;
      setFields(newFields);
    }
  };

  const addField = () => {
    const newField = { label: "New Field", icon: <FiPlus />, value: "00.0" };
    setFields([...fields, newField]);
  };

  const goBack = () => {
    // Logic for back button
    console.log("Back button clicked");
  };

  return (
    <div className="measurements-container">
      <button className="back-button" onClick={goBack}>
        <FiArrowLeft /> Back
      </button>
      <input
        type="text"
        className="measurement-name-input"
        value={measurementName}
        onChange={(e) => setMeasurementName(e.target.value)}
        placeholder="Enter measurement name"
      />
      <div className="measurements-grid">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`measurement-field ${
              index === selectedFieldIndex ? "selected" : ""
            }`}
            onClick={() => handleFieldClick(index)}
          >
            <span className="icon">{field.icon}</span>
            <label>{field.label}</label>
            <div className="measurement-value">{field.value}</div>
          </div>
        ))}
      </div>
      <button className="add-field-btn" onClick={addField}>
        <FiPlus /> Add Extra Field
      </button>

      <div className="sticky-wheel-inputs">
        <div className="wheel-input">
          <Experiments
            options={wholeNumberOptions}
            onChange={handleWholeNumberChange}
          />
        </div>
        <div className="wheel-input">
          <Experiments
            options={decimalOptions}
            onChange={handleDecimalChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MeasurementsInput;
