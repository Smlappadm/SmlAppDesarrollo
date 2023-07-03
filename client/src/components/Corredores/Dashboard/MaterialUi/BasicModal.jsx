import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#39394B",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [seguidores2000, setSeguidores2000] = React.useState(false);
  const [repercusion, setRepercusion] = React.useState(false);
  const [frecuencia, setFrecuencia] = React.useState(false);
  const [contenidoPersonal, setContenidoPersonal] = React.useState(false);
  const [contenidoValor, setContenidoValor] = React.useState(false);
  const [calidadInstagram, setCalidadInstagram] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(seguidores2000);

  return (
    <div>
      <Button onClick={handleOpen}>Descripción</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <FormControlLabel
              onClick={handleseguidores2000}
              control={<Checkbox />}
              label="Tiene mas de 2000 seguidores?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tiene Repercusion en sus Reels-Publicaciones?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Sube contenido con frecuencia?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Su contenido tiende a la marca personal?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Sube Contenido de valor?"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Su  cuenta de instagram esta administrada con caliad?"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
