// import * as React from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';

// export default function LinearDeterminate() {
//   const [progress, setProgress] = React.useState(0);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress === 100) {
//           return 0;
//         }
//         const diff = Math.random() * 10;
//         return Math.min(oldProgress + diff, 100);
//       });
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <Box sx={{ width: '85%'}}>
//       <LinearProgress color="success" sx={{ height: '20px', borderRadius: "10px", backgroundColor:"black", color: "green",
//        "& .css-h8g9t7-MuiLinearProgress-bar1": {
//         backgroundColor: "#28b61b",
//         borderRadius: "10px"
//       },
//     }} variant="determinate" value={progress} />
//     </Box>
//   );
// }
import React, { useState, useEffect } from "react";

export default function LinearDeterminate({
  value,
  minValue = 0,
  maxValue = 100,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Asegurarse de que el valor de progreso esté dentro del rango mínimo y máximo
    const clampedValue = Math.min(Math.max(value, minValue), maxValue);

    // Actualizar el progreso con una animación suave durante 500 milisegundos
    const animationDuration = 500;
    const animationSteps = 60;
    const stepIncrement = (clampedValue - progress) / animationSteps;

    let currentProgress = progress;
    const interval = setInterval(() => {
      currentProgress += stepIncrement;
      setProgress(currentProgress);

      if (
        (stepIncrement > 0 && currentProgress >= clampedValue) ||
        (stepIncrement < 0 && currentProgress <= clampedValue)
      ) {
        setProgress(clampedValue);
        clearInterval(interval);
      }
    }, animationDuration / animationSteps);

    return () => {
      clearInterval(interval);
    };
  }, [value, minValue, maxValue]);

  const progressBarStyles = {
    width: "85%",
    height: "15px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  };

  const progressBarFillStyles = {
    height: "100%",
    backgroundColor: "#2ecc71",
    borderRadius: "10px",
    width: `${progress}%`,
    transition: "width 1s linear", 
  };

  return (
    <div className="progress-bar" style={progressBarStyles}>
      <div className="progress-bar__fill" style={progressBarFillStyles}></div>
    </div>
  );
}
