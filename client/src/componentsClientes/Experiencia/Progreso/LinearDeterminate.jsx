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

import React from "react";

export default function LinearDeterminate({ value, minValue = 0, maxValue = 5000 }) {
  const progress = (value - minValue) / (maxValue - minValue) * 100;

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
  };

  return (
    <div className="progress-bar" style={progressBarStyles}>
      <div className="progress-bar__fill" style={progressBarFillStyles}></div>
    </div>
  );
}
