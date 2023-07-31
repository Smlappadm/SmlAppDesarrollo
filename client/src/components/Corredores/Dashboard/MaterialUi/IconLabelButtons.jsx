import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function IconLabelButtons() {
  return (
    <Stack>
      <Button
        variant="outlined"
        style={{ color: "white", borderColor: "#ae2dff" }}
        endIcon={<SendIcon style={{ color: "#ae2dff" }} />}
      >
        Enviar
      </Button>
    </Stack>
  );
}
