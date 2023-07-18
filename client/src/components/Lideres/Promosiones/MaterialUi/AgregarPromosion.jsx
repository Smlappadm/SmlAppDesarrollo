import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "30px",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  backgroundColor: "#39394b",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AgregarPromosion() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [hora, setHora] = React.useState();
  const [cuota, setCuota] = React.useState();
  const [monto, setMonto] = React.useState();
  const [valorCuota, setValorCuota] = React.useState();
  const [link, setLink] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeHora = (event) => {
    setHora(event.target.value);
  };

  const handleChangeCuota = (event) => {
    setCuota(event.target.value);
  };

  const handleChangeMonto = (event) => {
    setMonto(event.target.value);
  };

  const handleChangeValorCuota = (event) => {
    setValorCuota(event.target.value);
  };

  const handleChangeLink = (event) => {
    setLink(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Añadir Promosiones
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-5">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregue una Promoción nueva
            </Typography>
            <TextField
              fullWidth
              label="Nombre de promoción"
              type="text"
              id="Nombre"
              value={name}
              onChange={handleChangeName}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Horas"
              id="Horas"
              value={hora}
              onChange={handleChangeHora}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="text"
              label="Link de Stripe"
              id="Link"
              value={link}
              onChange={handleChangeLink}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Cantidad de Cuotas"
              id="Cuotas"
              value={cuota}
              onChange={handleChangeCuota}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Monto de Cuotas"
              id="Monto"
              value={valorCuota}
              onChange={handleChangeValorCuota}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Monto Total"
              id="Monto"
              value={monto}
              onChange={handleChangeMonto}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
