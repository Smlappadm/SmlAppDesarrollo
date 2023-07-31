import * as React from "react";
import Stack from "@mui/material/Stack";

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "#ae2dff",
          "&:hover": {
            borderColor: "#a020f0",
          },
        }}
      >
        Ingresar
      </ColorButton>
    </Stack>
  );
}
