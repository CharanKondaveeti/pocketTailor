import React, { useState } from "react";
import "./Experiments.css";

const Experiments = ({ options, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(2); // Start with the third item highlighted
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const itemHeight = 32; // Height of each item in pixels (adjusted based on CSS)

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

  const handleMouseMove = (event) => {
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

  const handleTouchMove = (event) => {
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
        setStartY(currentY);
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }}
    >
      <div
        className="wheel-picker-list"
        style={{
          transform: `translateY(-${(selectedIndex - 1) * itemHeight}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`wheel-picker-item ${
              index === selectedIndex ? "active" : ""
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
