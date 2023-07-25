import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllPromociones } from "../../../../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#39394b",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  borderRadius: "30px",
  p: 4,
};

const styleButton = {
  bgcolor: "transparent",
  width: "96.5%",
  height: "3rem",
};

const buttonsend = {
  bgcolor: "transparent",
  width: "50%",
};

export default function ActualizarPromocion({ item }) {
  const dispatch = useDispatch();
  // <-- Use destructuring here
  const [open, setOpen] = React.useState(false);
  const [promocion, setPromocion] = React.useState({
    name: item.promocion.name,
    hora: item.promocion.hora,
    link: item.promocion.link,
    cuota: item.promocion.cuota,
    monto: item.promocion.monto,
    valorCuota: item.promocion.valorCuota,
    descuento: item.promocion.descuento,
    active: item.promocion.active,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, property) => {
    let newValue;

    if (
      property === "hora" ||
      property === "cuota" ||
      property === "monto" ||
      property === "descuento" ||
      property === "valorCuota"
    ) {
      newValue = parseInt(event.target.value);
    } else if (property === "active") {
      // Toggle the boolean value of active
      newValue = !promocion.active;
    } else {
      newValue = event.target.value;
    }

    setPromocion({
      ...promocion,
      [property]: newValue,
    });
  };

  const actualizarPromocion = async () => {
    console.log(promocion);
    await axios.put(`/promociones/${item._id}`, promocion);
    dispatch(getAllPromociones());
    handleClose();
  };
  console.log(promocion);

  return (
    <div className="flex items-center justify-center">
      <Button sx={styleButton} onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Quieres modificar la promoción {item.promocion.name}?
          </Typography>
          <TextField
            fullWidth
            label="Promoción"
            id="Promoción"
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
            label="Hora"
            id="Hora"
            type="number"
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
            label="Link"
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
            label="Cuota"
            id="Cuota"
            type="number"
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
            label="Monto"
            id="Monto"
            type="number"
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
          <TextField
            fullWidth
            label="Valor de Cuota"
            id="ValorCuota"
            type="number"
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
            label="Valor de Cuota"
            id="Descuento"
            type="number"
            value={promocion.descuento}
            onChange={(e) => handleChange(e, "descuento")}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={promocion.active}
                onChange={(e) => handleChange(e, "active")}
                color="primary"
                size="large"
              />
            }
            label={`Estado de la Promoción: ${
              item.promocion.active === true ? " Activa " : " Inactiva "
            }`}
          />

          <Button
            sx={buttonsend}
            variant="outlined"
            onClick={actualizarPromocion}
          >
            Actualizar Promoción
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
