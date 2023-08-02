import { Box, Modal } from "@mui/material";
import React from "react";

export default function ModalDescartado(open, close) {
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.3)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full"></div>
        </Box>
      </Modal>
    </div>
  );
}
