import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "30px",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DownloadCSV() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Descargar CSV
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "30%",
            height: "50%",
            bgcolor: "#39394b",
          }}
        >
          <div>
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">Descargar archivo CSV</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "blueviolet",
                }}
              >
                0
              </Button>
              <Button variant="outlined">1</Button>
              <Button variant="outlined">2</Button>
              <Button variant="outlined">3</Button>
            </div>
            <Button variant="contained">Descargar CSV</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
