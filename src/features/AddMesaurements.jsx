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
import ankle from "./../assets/measurementIcons/ankle.png";
import bottom from "./../assets/measurementIcons/bottom.png";
import chest from "./../assets/measurementIcons/chest.png";
import hip from "./../assets/measurementIcons/hip.png";
import knee from "./../assets/measurementIcons/knee.png";
import shoulder from "./../assets/measurementIcons/shoulder.png";
import waist from "./../assets/measurementIcons/waist.png";
import "./css/MeasurementsInput.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMeasurement } from "../api/customers";

const wholeNumberOptions = Array.from({ length: 101 }, (_, i) =>
  i < 10 ? `0${i}` : `${i}`
);
const decimalOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const AddMeasurements = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { customerId } = location.state || {};

  const [measurementName, setMeasurementName] = useState("");
  const [fields, setFields] = useState([
    { label: "Shoulder", image: shoulder, value: "00.0", isNew: false },
    { label: "ArmHole", image: hip, value: "00.0", isNew: false },
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
  const [unit, setUnit] = useState("cm");

  const newFieldInputRef = useRef(null);

  const whenGivingInput = (e, index) => {
    const { value } = e.target;
    setFields((prevFields) =>
      prevFields.map((field, i) => (i === index ? { ...field, value } : field))
    );
  };

  const confirmOrdersMutation = useMutation({
    mutationFn: addMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries("measurements");
      navigate("/order", {
        state: { customerId },
      });
    },
    onError: (error) => {
      console.error("Order submission failed:", error);
    },
  });

  const whenSubmitClicked = () => {
    const finalData = {
      customerId,
      category: measurementName,
      data: fields.map((field) => ({
        [field.label]: field.value,
      })),
      units: unit,
    };
    confirmOrdersMutation.mutate(finalData);
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

  const goBack = () => navigate(-1);

  return (
    <div className="measurements-container">
      <div className="row-1">
        <button className="back-button" onClick={goBack}>
          <IoIosArrowRoundBack size={30} />
        </button>
        <h1 className="heading--primary">Measurements</h1>
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
          >
            <span className="icon">
              <img src={field.image} alt={`${field.label} icon`} />
            </span>
            <span className="measurement-label">{field.label}</span>
            <div className="measurement-value">
              <span className="unit">{unit}</span>
              <input
                type="number"
                name={field.label}
                className="whole-number-input"
                value={field.value.split(".")[0]}
                onChange={(e) => whenGivingInput(e, index)}
                min="0"
                max="99"
              />
            </div>
          </div>
        ))}
      </div>
      <button className="add-field" onClick={addField}>
        <FiPlus />
      </button>
      <div className="measurements-footer">
        <button className="submit-button" onClick={whenSubmitClicked}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddMeasurements;
