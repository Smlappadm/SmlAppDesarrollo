import React from "react";

export default function CustomsIcons({ imagen, isVisible }) {
  return (
    <div>
      {isVisible ? (
        <div className="w-24 h-24 rounded-full">
          <img src={imagen} />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full border-2 "></div>
      )}
    </div>
  );
}
