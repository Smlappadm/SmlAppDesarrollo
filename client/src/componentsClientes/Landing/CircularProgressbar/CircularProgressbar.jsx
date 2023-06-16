import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ value, imageSrc }) => {
  const percentage = (value / 10000) * 100;

  return (
    <div style={{ width: "8.2rem", position: "relative" }}>
      <CircularProgressbar
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "#570387",
          trailColor: "transparent",
        })}
      />
      <img
        src={imageSrc}
        alt="Imagen"
        className="h-28 w-28 rounded-full border-2 border-gray-500 bg-white"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CircularProgressBar;
