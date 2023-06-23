import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  findCorredoresByNameAllInfo,
  getCorredor,
} from "../../../../redux/actions";

export default function InputName({ name }) {
  const dispatch = useDispatch();
  const [names, setNames] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");

  const { allCorredores } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCorredor());
  }, [dispatch]);

  const handleChange = (event) => {
    let value = event.target.value;
    setNames(value);
  };

  const handleFromDay = (event) => {
    setFromDay(event.target.value);
  };
  const handleToDay = (event) => {
    setToDay(event.target.value);
  };

  const handleFilterClick = () => {
    dispatch(findCorredoresByNameAllInfo(names, fromDay, toDay));
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
      <Select
        value={names}
        onChange={handleChange}
        label="Buscar por corredor"
        id="runner"
        size="small"
        variant="outlined"
        displayEmpty
        inputProps={{
          style: {
            color: "white",
          },
        }}
        sx={{
          color: "white",
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
          },
          "& .MuiSelect-outlined": {
            paddingRight: "28px",
          },
        }}
      >
        <MenuItem value="" disabled>
          Buscar por corredor
        </MenuItem>
        {allCorredores.map((corredor) => (
          <MenuItem key={corredor} value={corredor}>
            {corredor}
          </MenuItem>
        ))}
      </Select>

      <TextField
        type="date"
        value={fromDay}
        onChange={handleFromDay}
        label=""
        size="small"
        variant="outlined"
        inputProps={{
          min: 1,
          max: 31,
          step: 1,
          style: {
            color: "white",
          },
        }}
        sx={{
          width: "150px",
        }}
      />
      <TextField
        type="date"
        value={toDay}
        onChange={handleToDay}
        label=""
        placeholder="hola"
        size="small"
        variant="outlined"
        inputProps={{
          min: 1,
          max: 31,
          step: 1,
          style: {
            color: "white",
          },
        }}
        sx={{
          width: "150px",
        }}
      />

      <Button onClick={handleFilterClick} variant="contained" size="small">
        Filtrar
      </Button>
    </Box>
  );
}
