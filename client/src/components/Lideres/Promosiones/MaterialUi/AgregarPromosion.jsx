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
  const [promocion, setPromocion] = React.useState({
    name: "",
    hora: 0,
    cuota: 0,
    monto: 0,
    valorCuota: 0,
    link: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, property) => {
    setPromocion({
      ...promocion,
      [property]: event.target.value,
    });
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
              value={promocion.name}
              onChange={(e) => handleChange(e, "name")}
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
              value={promocion.hora}
              onChange={(e) => handleChange(e, "hora")}
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
              value={promocion.link}
              onChange={(e) => handleChange(e, "link")}
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
              value={promocion.cuota}
              onChange={(e) => handleChange(e, "cuota")}
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
              value={promocion.valorCuota}
              onChange={(e) => handleChange(e, "valorCuota")}
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
              value={promocion.monto}
              onChange={(e) => handleChange(e, "monto")}
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
