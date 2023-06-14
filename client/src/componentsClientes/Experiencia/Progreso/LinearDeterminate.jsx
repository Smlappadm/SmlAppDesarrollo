import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '85%'}}>
      <LinearProgress color="success" sx={{ height: '20px', borderRadius: "10px", backgroundColor:"black", color: "green",
       "& .css-h8g9t7-MuiLinearProgress-bar1": {
        backgroundColor: "#28b61b",
        borderRadius: "10px"
      },
    }} variant="determinate" value={progress} />
    </Box>
  );
}