import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import InputIncidencia from "./InputIncidencia";
import { TbPointFilled } from "react-icons/tb";
import styles from "./NestedModal.module.css";
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

function ChildModal({
  inputIncidencia,
  handleReset,
  handleCloseChild,
  itemId,
  setOpen
}) {
  const [openChild, setOpenChild] = useState(false);
  const handleOpen = () => {
    setOpenChild(true);
   
  };
  const handleClose = () => {
    setOpenChild(false);
  
  };

  const handleIncidencia = async () => {
    try {
      await axios.put(`/lead/${itemId}`, {
        status_op: inputIncidencia,
      });
    } catch (error) {
      console.log(`No se pudo enviar la incidencia`);
    }
    
    setOpenChild(false);
    setOpen(false)
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
        open={openChild}
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

export default function NestedModal({
  itemId,
  openModal,
  setOpenModal,
  handleClientClick,
  item,
}) {

  console.log(item.level);
  const [open, setOpen] = useState(false);

  const handleOpen = (event, index) => {
    setOpen(true);
    handleClientClick(event, index);
  };
  const handleClose = () => {
    setOpen(false);
    // setOpenModal(false);
  };

  const [inputIncidencia, setInputIncidencia] = useState("");

  const handleReset = () => {
    setInputIncidencia("");
  };

  return (
    <div>
      <button
        className={
          item.level === "incidencia"
            ? styles.buttonNivelActive
            : styles.buttonNivel
        }
        type="button"
        name={item._id}
        value="incidencia"
        onClick={handleOpen}
      >
        ⚠
      </button>

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
              <h2 id="parent-modal-title">{item.name}</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <InputIncidencia
                inputIncidencia={inputIncidencia}
                setInputIncidencia={setInputIncidencia}
              />
            </div>
          </div>
          <ChildModal
          setOpen={setOpen}
            itemId={itemId}
            inputIncidencia={inputIncidencia}
            handleReset={handleReset}
            handleCloseChild={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
