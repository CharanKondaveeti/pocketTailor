import React, { useState } from "react";
import "./Experiments.css";

const Experiments = ({
  wholeNumberOptions,
  decimalOptions,
  onWholeChange,
  onDecimalChange,
}) => {
  const [selectedWholeIndex, setSelectedWholeIndex] = useState(2); // Start with the third item highlighted for whole numbers
  const [selectedDecimalIndex, setSelectedDecimalIndex] = useState(1); // Start with the second item highlighted for decimals
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const itemHeight = 32; // Height of each item in pixels (adjust based on your CSS)

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setStartY(event.clientY);
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setStartY(event.touches[0].clientY);
  };

  const handleMouseMove = (
    event,
    options,
    selectedIndex,
    setSelectedIndex,
    onChange
  ) => {
    if (isDragging) {
      const currentY = event.clientY;
      const offset = startY - currentY;

      if (offset > itemHeight && selectedIndex < options.length - 1) {
        const newIndex = Math.min(selectedIndex + 1, options.length - 1);
        setSelectedIndex(newIndex);
        setStartY(currentY);
        onChange(options[newIndex]); // Call onChange with the new value
      } else if (offset < -itemHeight && selectedIndex > 0) {
        const newIndex = Math.max(selectedIndex - 1, 0);
        setSelectedIndex(newIndex);
        setStartY(currentY);
        onChange(options[newIndex]); // Call onChange with the new value
      }
    }
  };

  const handleTouchMove = (
    event,
    options,
    selectedIndex,
    setSelectedIndex,
    onChange
  ) => {
    if (isDragging) {
      const currentY = event.touches[0].clientY;
      const offset = startY - currentY;

      if (offset > itemHeight && selectedIndex < options.length - 1) {
        const newIndex = Math.min(selectedIndex + 1, options.length - 1);
        setSelectedIndex(newIndex);
        setStartY(currentY);
        onChange(options[newIndex]); // Call onChange with the new value
      } else if (offset < -itemHeight && selectedIndex > 0) {
        const newIndex = Math.max(selectedIndex - 1, 0);
        setSelectedIndex(newIndex);
        onChange(options[newIndex]); // Call onChange with the new value
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="wheel-picker"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }}
    >
      <div
        className="wheel-picker-list"
        onMouseDown={handleMouseDown}
        onMouseMove={(event) =>
          handleMouseMove(
            event,
            wholeNumberOptions,
            selectedWholeIndex,
            setSelectedWholeIndex,
            onWholeChange
          )
        }
        onTouchStart={handleTouchStart}
        onTouchMove={(event) =>
          handleTouchMove(
            event,
            wholeNumberOptions,
            selectedWholeIndex,
            setSelectedWholeIndex,
            onWholeChange
          )
        }
        style={{
          transform: `translateY(-${(selectedWholeIndex - 1) * itemHeight}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {wholeNumberOptions.map((option, index) => (
          <div
            key={index}
            className={`wheel-picker-item ${
              index === selectedWholeIndex ? "active" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiments;
