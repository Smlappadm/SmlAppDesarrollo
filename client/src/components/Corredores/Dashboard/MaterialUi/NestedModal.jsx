import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import InputIncidencia from "./InputIncidencia";
import { BsFillEnvelopePaperFill } from "react-icons/bs";

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

function ChildModal({ inputIncidencia, handleReset, handleCloseChild, item }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleIncidencia = async () => {
    try {
      const response = await axios.put(`/lead/${item._id}`, {
        status_op: inputIncidencia,
      });
      console.log(response.data);
    } catch (error) {
      console.log(`No se pudo enviar la incidencia`);
    }

    setOpen(false);
    handleReset();
  };

  return (
    <div>
      <div className="flex gap-2 justify-center items-center mt-5">
        <Button variant="outlined" onClick={handleCloseChild}>
          Cerrar
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Siguiente
        </Button>
      </div>
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <div className="flex flex-col gap-5 p-2">
            <h2 id="child-modal-title">Descripcion de incidencia</h2>
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="flex gap-2">
                <h2 id="child-modal-description">Incidencia: </h2>
                <p id="child-modal-description">{inputIncidencia}</p>
              </div>
            </div>
            <p id="child-modal-description">
              Estas seguro que queres enviar esta incidencia?
            </p>
            <div className="flex justify-center gap-2 items-center">
              <Button variant="outlined" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="contained" onClick={handleIncidencia}>
                Enviar incidencia
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default function NestedModal({ item }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [inputIncidencia, setInputIncidencia] = useState("");

  const handleReset = () => {
    setInputIncidencia("");
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        {item.status_op === "" ? (
          <BsFillEnvelopePaperFill className="text-[1.6rem] text-[#a89e3c] hover:text-[#3570bd]" />
        ) : (
          <BsFillEnvelopePaperFill className="text-[1.6rem] text-[#4da342] hover:text-[#3570bd]" />
        )}
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
              <h2 id="parent-modal-title">Nueva incidencia</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <InputIncidencia
                inputIncidencia={inputIncidencia}
                setInputIncidencia={setInputIncidencia}
              />
            </div>
          </div>
          <ChildModal
            item={item}
            inputIncidencia={inputIncidencia}
            handleReset={handleReset}
            handleCloseChild={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
