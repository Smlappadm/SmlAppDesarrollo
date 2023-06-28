import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  getAllProfesion,
} from "../../../../redux/actions";

export default function InputName({body, getLeadCheckedInactive5}) {
  const dispatch = useDispatch();
  const [profesion, setProfesion] = useState("");

  const [country, setCountry] = useState("");

  const { allProfesion } = useSelector((state) => state);

  const { allCountries } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllProfesion());

    dispatch(getAllCountries());
  }, [dispatch]);

  const handleChangeProfesion = (event) => {
    let value = event.target.value;
    setProfesion(value);
  };



  const handleChangeCountries = (event) => {
    let value = event.target.value;
    setCountry(value);
  };


  const handleFilterClick = () => {
    console.log(profesion)
    console.log(country)
    dispatch(
      getLeadCheckedInactive5(
        body,
        profesion,
        country,
      )
    );
  };

  const handleFilterReset = () => {
    setProfesion("");
    setCountry("");
    dispatch(
      getLeadCheckedInactive5(
        body,
        profesion,
        country,
      )
    )
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
        paddingBottom: "10px",
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
      <div className="flex gap-5">


        <div className="flex flex-col w-56">
          <label>Profesión:</label>
          <Select
            value={profesion}
            onChange={handleChangeProfesion}
            label=""
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
            <MenuItem value="">Profesión</MenuItem>
            {allProfesion.map((profesion) => (
              <MenuItem key={profesion} value={profesion}>
                {profesion}
              </MenuItem>
            ))}
          </Select>
        </div>


        <div className="flex flex-col w-36">
          <label>Países:</label>
          <Select
            value={country}
            onChange={handleChangeCountries}
            label=""
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
            <MenuItem value="">País</MenuItem>
            {allCountries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-5 items-end justify-center">
          <Button onClick={handleFilterClick} variant="contained" size="large">
            Filtrar
          </Button>
          <Button onClick={handleFilterReset} variant="outlined" size="large">
            Reset
          </Button>
        </div>
      </div>
    </Box>
  );
}
