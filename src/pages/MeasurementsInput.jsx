import React, { useState, useRef, useEffect } from "react";
import {
  FiPlus,
  FiArrowLeft,
  FiEdit,
  FiTrash,
  FiMoreVertical,
} from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import Experiments from "./../Experiments";

// Image imports
import ankle from "./../assets/measurementIcons/ankle.png";
import bottom from "./../assets/measurementIcons/bottom.png";
import chest from "./../assets/measurementIcons/chest.png";
import hip from "./../assets/measurementIcons/hip.png";
import knee from "./../assets/measurementIcons/knee.png";
import shoulder from "./../assets/measurementIcons/shoulder.png";
import waist from "./../assets/measurementIcons/waist.png";

import "./css/MeasurementsInput.css";

const wholeNumberOptions = Array.from({ length: 101 }, (_, i) =>
  i < 10 ? `0${i}` : `${i}`
);
const decimalOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const MeasurementsInput = () => {
  const [fields, setFields] = useState([
    { label: "Shoulder", image: shoulder, value: "00.0", isNew: false },
    { label: "Arm Hole", image: hip, value: "00.0", isNew: false },
    { label: "Chest", image: chest, value: "00.0", isNew: false },
    { label: "Sleeve", image: shoulder, value: "00.0", isNew: false },
    { label: "Wrist", image: ankle, value: "00.0", isNew: false },
    { label: "Waist", image: waist, value: "00.0", isNew: false },
    { label: "Hip", image: hip, value: "00.0", isNew: false },
    { label: "Bottom", image: bottom, value: "00.0", isNew: false },
    { label: "Knee", image: knee, value: "00.0", isNew: false },
    { label: "Ankle", image: ankle, value: "00.0", isNew: false },
  ]);

  const [menuOpen, setMenuOpen] = useState(null); // Tracks which menu is open
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [measurementName, setMeasurementName] = useState("");
  const [unit, setUnit] = useState("cm");

  const newFieldInputRef = useRef(null);

  const convertMeasurement = (value, toUnit) => {
    const [whole, decimal] = value.split(".");
    const numericValue = parseFloat(`${whole}.${decimal}`);
    if (toUnit === "inches") {
      const convertedValue = (numericValue / 2.54).toFixed(1);
      return formatMeasurement(convertedValue);
    } else {
      const convertedValue = (numericValue * 2.54).toFixed(1);
      return formatMeasurement(convertedValue);
    }
  };

  const formatMeasurement = (value) => {
    const [whole, decimal] = value.split(".");
    return `${whole.padStart(2, "0")}.${decimal}`;
  };

  const toggleUnit = () => {
    const newUnit = unit === "cm" ? "in" : "cm";
    const newFields = fields.map((field) => ({
      ...field,
      value: convertMeasurement(field.value, newUnit),
    }));
    setUnit(newUnit);
    setFields(newFields);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".measurements-grid")) {
        setSelectedFieldIndex(null);
        setMenuOpen(null); // Close the menu when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (newFieldInputRef.current) {
      newFieldInputRef.current.focus();
    }
  }, [fields]);

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

  const handleFieldLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].label = newLabel;
    setFields(newFields);
  };

  const addField = () => {
    const newField = {
      label: "New Field",
      image: ankle, // default icon
      value: "00.0",
      isEditing: true,
      isNew: true,
    };
    setFields([...fields, newField]);
    setSelectedFieldIndex(fields.length);
  };

  const stopEditing = (index) => {
    const newFields = [...fields];
    newFields[index].isEditing = false;
    setFields(newFields);
  };

  const goBack = () => {
    console.log("Back button clicked");
  };

  const deleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    setSelectedFieldIndex(null);
    setMenuOpen(null); // Close menu after deleting
  };

  const editField = (index) => {
    const newFields = [...fields];
    newFields[index].isEditing = true;
    setFields(newFields);
    setSelectedFieldIndex(index);
    setMenuOpen(null); // Close menu after editing
  };

  const handleMenuClick = (index) => {
    setMenuOpen(index === menuOpen ? null : index); // Toggle the menu
  };

  const handleSubmit = () => {
    console.log("Measurements Data:", fields);
  };

  return (
    <div className="measurements-container">
      <div className="row-1">
        <button className="back-button" onClick={goBack}>
          <IoIosArrowRoundBack size={30} />
        </button>
        <h1 className="heading--primary">measurements</h1>
      </div>
      <div className="row-2">
        <input
          type="text"
          className="measurement-name-input"
          value={measurementName}
          onChange={(e) => setMeasurementName(e.target.value)}
          placeholder="Enter measurement name"
        />
        <button className="unit-toggle" onClick={toggleUnit}>
          {unit === "cm" ? "Inches" : "CM"}
        </button>
      </div>
      <div className="measurements-grid">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`measurement-field ${
              index === selectedFieldIndex ? "selected" : ""
            }`}
            onClick={() => handleFieldClick(index)}
          >
            <span className="icon">
              <img src={field.image} alt={`${field.label} icon`} />
            </span>
            {field.isEditing ? (
              <input
                type="text"
                ref={index === fields.length - 1 ? newFieldInputRef : null}
                className="field-label-input"
                value={field.label}
                onChange={(e) => handleFieldLabelChange(index, e.target.value)}
                onBlur={() => stopEditing(index)}
                placeholder="Enter field name"
              />
            ) : (
              <label>{field.label}</label>
            )}
            <div className="measurement-value">
              {field.value} <span className="units">{unit}</span>
            </div>

            {/* Ellipsis Menu (only for newly added fields) */}
            {field.isNew && (
              <div className="ellipsis-menu">
                <button
                  className="menu-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick(index);
                  }}
                >
                  <FiMoreVertical size={20} />
                </button>
                {menuOpen === index && (
                  <div className="menu-options">
                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        editField(index);
                      }}
                    >
                      <FiEdit size={16} />
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteField(index);
                      }}
                    >
                      <FiTrash size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <button className="add-field-button" onClick={addField}>
          <FiPlus size={20} />
          Add Extra Field
        </button>
      </div>
      <div className="measurement-bottom">
        <div className="swipe-controls">
          <Experiments
            wholeNumberOptions={wholeNumberOptions}
            decimalOptions={decimalOptions}
            onWholeChange={handleWholeNumberChange}
            onDecimalChange={handleDecimalChange}
          />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MeasurementsInput;
