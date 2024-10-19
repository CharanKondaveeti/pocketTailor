import React, { useState } from "react";
import "./Experiments.css";

const Experiments = ({ options }) => {
  const [selectedIndex, setSelectedIndex] = useState(2); // Start with the third item highlighted
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const itemHeight = 40; // Height of each item in pixels

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
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
        setStartY(currentY);
      } else if (offset < -itemHeight && selectedIndex > 0) {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        setStartY(currentY);
      }
    }
  };

  const handleTouchMove = (event) => {
    if (isDragging) {
      const currentY = event.touches[0].clientY;
      const offset = startY - currentY;

      if (offset > itemHeight && selectedIndex < options.length - 1) {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
        setStartY(currentY);
      } else if (offset < -itemHeight && selectedIndex > 0) {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        setStartY(currentY);
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
      style={{ touchAction: "none" }} // Prevent default touch actions
    >
      <div
        className="wheel-picker-list"
        style={{
          transform: `translateY(-${(selectedIndex - 1) * itemHeight}px)`, // Adjust so that the center item is the highlighted one
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
