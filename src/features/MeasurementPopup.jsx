import React, { useState } from "react";
import "./css/MeasurementPopup.css";

const MeasurementPopup = ({
  measurements,
  onSelect,
  onClose,
  onCategorySelect,
}) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const handleCategorySelect = (category) => {
    // Call the onCategorySelect prop to handle the selected category
    onCategorySelect(category);
    onClose(); // Close the popup after selection
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Select Measurement</h2>
        {Object.entries(measurements).map(([category, values]) => (
          <div key={category}>
            <h3
              onClick={() => toggleCategory(category)}
              style={{ cursor: "pointer" }}
            >
              {category} {openCategory === category ? "−" : "+"}
            </h3>
            {openCategory === category && (
              <div>
                <ul>
                  {values.map((value, index) => (
                    <li key={index} onClick={() => onSelect(value)}>
                      {value.label}: {value.value} {value.unit}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCategorySelect(category)}>
                  Select this category
                </button>
              </div>
            )}
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MeasurementPopup;
