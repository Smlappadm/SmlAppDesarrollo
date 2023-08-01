import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function IconLabelButtons() {
  return (
    <Stack>
      <Button
        variant="contained"
        style={{
          color: "white",
          borderColor: "#ae2dff",
          background: "#ae2dff",
        }}
        endIcon={<SendIcon />}
      >
        Enviar
      </Button>
    </Stack>
  );
}
