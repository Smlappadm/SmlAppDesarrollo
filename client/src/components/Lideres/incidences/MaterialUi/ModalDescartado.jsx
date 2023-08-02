import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(55 65 81)",
  boxShadow: 24,
  p: 4,
  textColor: "white",
  color: "white",
  height: 300,
  borderRadius: "20px",
};

export default function ModalDescartado({ open, close }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.7)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full w-full">
            <p>Hola</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
