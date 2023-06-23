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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { format } from "date-fns";

export default function InputName({ name }) {
  const dispatch = useDispatch();
  const [names, setNames] = useState("");
  const [fromDay, setFromDay] = useState(null);
  const [toDay, setToDay] = useState(null);

  const { allCorredores } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCorredor());
  }, [dispatch]);

  const handleChange = (event) => {
    let value = event.target.value;
    setNames(value);
  };

  const handleFromDay = (date) => {
    setFromDay(date);
  };

  const handleToDay = (date) => {
    setToDay(date);
  };

  const handleFilterClick = () => {
    const formattedFromDay = fromDay ? format(fromDay, "yyyy-MM-dd") : null;
    const formattedToDay = toDay ? format(toDay, "yyyy-MM-dd") : null;
    dispatch(
      findCorredoresByNameAllInfo(names, formattedFromDay, formattedToDay)
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
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

        <DatePicker
          value={fromDay}
          onChange={handleFromDay}
          TextFieldComponent={TextField}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              size="small"
              variant="outlined"
              sx={{
                width: "150px",
                color: "grey"
              }}
              value={fromDay ? format(fromDay, "yyyy-MM-dd") : ""}
            />
          )}
        />

        <DatePicker
          value={toDay}
          onChange={handleToDay}
          TextFieldComponent={TextField}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              size="small"
              variant="outlined"
              sx={{
                width: "150px",
                color: "grey"
              }}
              value={toDay ? format(toDay, "yyyy-MM-dd") : ""}
            />
          )}
        />

        <Button
          onClick={handleFilterClick}
          variant="outlined"
          size="small"
          sx={{
            color: "white",
            borderColor: "white",
          }}
        >
          Filtrar
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
