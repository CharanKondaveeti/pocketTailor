import React, { useState, useRef, useEffect } from "react";

import {
  FiPlus,
  FiArrowLeft,
  FiEdit,
  FiTrash,
  FiMoreVertical,
} from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

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

const AddMeasurements = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { customerId } = location.state;

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

  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [measurementName, setMeasurementName] = useState("");
  const [unit, setUnit] = useState("cm");

  const newFieldInputRef = useRef(null);

  // Fetch existing customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/customers/${customerId}`
        );
        if (!response.ok) throw new Error("Failed to fetch customer data.");
        const customer = await response.json();

        // Check if customer has measurements and it's an array
        const fetchedMeasurements = Array.isArray(customer.measurements)
          ? customer.measurements
          : [];

        setFields(
          fetchedMeasurements.length > 0 ? fetchedMeasurements : fields
        );
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleSubmit = async () => {
    // Fetch the existing customer data
    let existingCustomerData;
    try {
      const response = await fetch(
        `http://localhost:8000/customers/${customerId}`
      );
      if (!response.ok) throw new Error("Failed to fetch customer data.");
      existingCustomerData = await response.json();
    } catch (error) {
      console.error("Error fetching customer data:", error);
      return; // Exit if there's an error
    }

    // Create a new object to hold merged measurements
    const updatedMeasurements = {
      ...existingCustomerData.measurements, // Spread existing measurements
      [measurementName]: fields.map((field) => ({
        label: field.label,
        value: field.value,
        unit,
      })),
    };

    const updatedCustomerData = {
      measurements: updatedMeasurements,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/customers/${customerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCustomerData),
        }
      );

      if (!response.ok) throw new Error("Failed to update measurements.");
      console.log("Measurements Data submitted:", updatedCustomerData);
    } catch (error) {
      console.error("Error submitting measurements:", error);
    }
  };

  const convertMeasurement = (value, toUnit) => {
    const [whole, decimal] = value.split(".");
    const numericValue = parseFloat(`${whole}.${decimal}`);
    const convertedValue =
      toUnit === "inches" ? numericValue / 2.54 : numericValue * 2.54;
    return formatMeasurement(convertedValue.toFixed(1));
  };

  const formatMeasurement = (value) => {
    const [whole, decimal] = value.split(".");
    return `${whole.padStart(2, "0")}.${decimal}`;
  };

  const toggleUnit = () => {
    const newUnit = unit === "cm" ? "in" : "cm";
    setFields(
      fields.map((field) => ({
        ...field,
        value: convertMeasurement(field.value, newUnit),
      }))
    );
    setUnit(newUnit);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".measurements-grid")) {
        setSelectedFieldIndex(null);
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (newFieldInputRef.current) newFieldInputRef.current.focus();
  }, [fields]);

  const handleFieldClick = (index) => setSelectedFieldIndex(index);
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
      image: ankle,
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

  const goBack = () => navigate(-1);

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
    setSelectedFieldIndex(null);
    setMenuOpen(null);
  };

  const editField = (index) => {
    const newFields = [...fields];
    newFields[index].isEditing = true;
    setFields(newFields);
    setSelectedFieldIndex(index);
    setMenuOpen(null);
  };

  const handleMenuClick = (index) =>
    setMenuOpen(index === menuOpen ? null : index);

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
                value={field.label}
                onChange={(e) => handleFieldLabelChange(index, e.target.value)}
                onBlur={() => stopEditing(index)}
                ref={newFieldInputRef}
              />
            ) : (
              <span className="measurement-label">{field.label}</span>
            )}
            <div className="measurement-value">
              <span className="unit">{unit}</span>
              <input
                type="number"
                className="whole-number-input"
                value={field.value.split(".")[0]}
                onChange={(e) => handleWholeNumberChange(e.target.value)}
                min="0"
                max="99"
              />
              <select
                className="decimal-input"
                value={field.value.split(".")[1]}
                onChange={(e) => handleDecimalChange(e.target.value)}
              >
                {decimalOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                className="menu-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClick(index);
                }}
              >
                <FiMoreVertical />
              </button>
              {menuOpen === index && (
                <div className="dropdown-menu">
                  <button
                    className="edit-button"
                    onClick={() => editField(index)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteField(index)}
                  >
                    <FiTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="add-field" onClick={addField}>
        <FiPlus />
      </button>
      <div className="measurements-footer">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddMeasurements;
