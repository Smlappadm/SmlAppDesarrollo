import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button"; // Importa el componente Button
import { useDispatch } from "react-redux";
import { findCorredoresByNameAllInfo } from "../../../../redux/actions";

export default function InputName({ name }) {
  const dispatch = useDispatch();
  const [names, setNames] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");

  const handleChange = (event) => {
    let value = event.target.value;
    setNames(value);
    dispatch(findCorredoresByNameAllInfo(names));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleFromDay = (event) => {
    setFromDay(event.target.value);
  };
  const handleToDay = (event) => {
    setToDay(event.target.value);
  };

  const handleFilterClick = () => {
    dispatch(
      findCorredoresByNameAllInfo(names, selectedMonth, selectedYear, fromDay, toDay)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "50%",
        height: "33px",
        color: "gray",
        margin: "0px 10px",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "green",
        },
      }}
    >
      <TextField
        label="Buscar por corredor"
        id="runner"
        value={name}
        onChange={handleChange}
        size="small"
        InputProps={{
          style: {
            color: "white",
          },
        }}
        // InputLabelProps={{
        //   style: {
        //     color: "gray",
        //   },
        // }}
      />

      <TextField
        type="text"
        size="small"
        value={selectedYear}
        onChange={handleYearChange}
        label="Año"
        variant="outlined"
        InputProps={{
          style: {
            color: "gray",
          },
        }}
        // InputLabelProps={{
        //   style: {
        //     color: "gray", // Cambia el color del label aquí
        //   },
        // }}
        sx={{
          width: "75px", // Ajusta el ancho del TextField aquí
        }}
      />

      <Select
        value={selectedMonth}
        onChange={handleMonthChange}
        displayEmpty
        size="small"
        sx={{
          color: "gray",
        }}
        // InputLabelProps={{
        //   style: {
        //     color: "gray", // Cambia el color del label aquí
        //   },
        // }}
      >
        <MenuItem value="" disabled>
          Mes
        </MenuItem>
        <MenuItem value={"01"}>Enero</MenuItem>
        <MenuItem value={"02"}>Febrero</MenuItem>
        <MenuItem value={"03"}>Marzo</MenuItem>
        <MenuItem value={"04"}>Abril</MenuItem>
        <MenuItem value={"05"}>Mayo</MenuItem>
        <MenuItem value={"06"}>Junio</MenuItem>
        <MenuItem value={"07"}>Julio</MenuItem>
        <MenuItem value={"08"}>Agosto</MenuItem>
        <MenuItem value={"09"}>Septiembre</MenuItem>
        <MenuItem value={"10"}>Octubre</MenuItem>
        <MenuItem value={"11"}>Noviembre</MenuItem>
        <MenuItem value={"12"}>Diciembre</MenuItem>
      </Select>

      <TextField
        type="text"
        value={fromDay}
        onChange={handleFromDay}
        label="Desde"
        size="small"
        variant="outlined"
        inputProps={{
          min: 1,
          max: 31,
          step: 1,
          style: {
            color: "gray",
          },
        }}
        // InputLabelProps={{
        //   style: {
        //     color: "gray", // Cambia el color del label aquí
        //   },
        // }}
        sx={{
          width: "75px",
        }}
      />
      <TextField
        type="text"
        value={toDay}
        onChange={handleToDay}
        label="Hasta"
        size="small"
        variant="outlined"
        inputProps={{
          min: 1,
          max: 31,
          step: 1,
          style: {
            color: "gray",
          },
        }}
        // InputLabelProps={{
        //   style: {
        //     color: "gray", // Cambia el color del label aquí
        //   },
        // }}
        sx={{
          width: "75px", // Ajusta el ancho del TextField aquí
        }}
      />

      <Button onClick={handleFilterClick} variant="contained" size="small">
        Filtrar
      </Button>
    </Box>
  );
}
