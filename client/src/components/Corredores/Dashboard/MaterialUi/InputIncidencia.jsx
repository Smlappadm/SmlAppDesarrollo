import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputIncidencia({
  inputIncidencia,
  setInputIncidencia,
}) {
  const handleChange = (event) => {
    setInputIncidencia(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "70%",
        maxWidth: "100%",
        color: "white",
      }}
    >
      <TextField
        fullWidth
        label="Incidencia"
        id="Incidencia"
        value={inputIncidencia}
        onChange={handleChange}
        InputProps={{
          style: {
            color: "white",
          },
          multiline: true,
          rows: 8,
        }}
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        variant="outlined"
      />
    </Box>
  );
}
