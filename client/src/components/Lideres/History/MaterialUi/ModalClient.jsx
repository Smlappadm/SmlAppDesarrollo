import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgb(55 65 81)",
  boxShadow: 24,
  p: 4,
  textColor: "white",
  color: "white",
  height: 700,
  borderRadius: "20px",
};

export default function BasicModal({ modalItems, open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.3)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full">
            <div className="font-semibold flex flex-col gap-3 items-center text-24 mb-5">
              <h1>{modalItems.name}</h1>
              <hr className="border-gray-400 w-5/6 text-center" />
            </div>
            <div className="font-semibold flex gap-3">
              <p>CORREDOR:</p>
              <p className="font-normal">{modalItems.corredor_name}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CORREDOR EMAIL:</p>
              <p className="font-normal">{modalItems.corredor}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>VENDEDOR:</p>
              <p className="font-normal">{modalItems.vendedor_name}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>VENDEDOR EMAIL:</p>
              <p className="font-normal">{modalItems.vendedor}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>WEB:</p>
              <a
                href={modalItems.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {modalItems.url}
              </a>
            </div>
            <div className="font-semibold flex gap-3">
              <p>INSTAGRAM:</p>
              <a
                href={modalItems.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {modalItems.instagram}
              </a>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Descripción:</p>
              <p className="font-normal">{modalItems.description}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CATEGORIA:</p>
              <p className="font-normal">{modalItems.category}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Profesion:</p>
              <p className="font-normal">{modalItems.profesion}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Pais:</p>
              <p className="font-normal">{modalItems.country}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Provincia:</p>
              <p className="font-normal">{modalItems.province}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CIUDAD:</p>
              <p className="font-normal">{modalItems.city}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>NIVEL:</p>
              <p className="font-normal">{modalItems.level}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>EMAIL:</p>
              <p className="font-normal">{modalItems.email}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>TELEFONO:</p>
              <p className="font-normal">{modalItems.telephone}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>ESTADO:</p>
              <p className="font-normal">{modalItems.status}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>DETALLE:</p>
              <p className="font-normal">
                {modalItems.status_op ? modalItems.status_op : "-"}
              </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>LLamados:</p>
              <p className="font-normal">{modalItems.llamados}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>LLamada Venta:</p>
              <p className="font-normal">{modalItems.llamada_venta}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Cuotas:</p>
              <p className="font-normal">{modalItems.cuotas}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Marca Personal:</p>
              <p className="font-normal">{modalItems.marca_personal}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Speech:</p>
              <p className="font-normal">{modalItems.speech}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Monto Op:</p>
              <p className="font-normal">{modalItems.monto_op}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>Fecha Op:</p>
              <p className="font-normal">{modalItems.fecha_op}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
