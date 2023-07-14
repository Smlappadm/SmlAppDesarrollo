import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountriesFreelance,
  getAllProfesionFreelance,
} from "../../../../../redux/actions";

export default function InputName({
  body,
  getLeadCheckedFreelance,
  emailAddress,
}) {
  const dispatch = useDispatch();
  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [freelancer, setFreelancer] = useState("undefined");

  const { allProfesionFreelance } = useSelector((state) => state);
  const { allCountriesFreelance } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllCountriesFreelance(emailAddress));

    dispatch(getAllProfesionFreelance(emailAddress));
  }, [dispatch]);

  const handleChangeProfesion = (event) => {
    let value = event.target.value;
    setProfesion(value);
  };

  const handleChangeCountries = (event) => {
    let value = event.target.value;
    setCountry(value);
  };
  const handleChangeStatus = (event) => {
    let value = event.target.value;
    setStatus(value);
  };

  //AGREGADO
  const handleChangeFreelancer = (event) => {
    setFreelancer(event.target.checked ? email : "undefined");
  };

  const handleFilterClick = () => {
    console.log(profesion);
    console.log(country);
    console.log(status);
    dispatch(getLeadCheckedFreelance(body, profesion, country, status));
  };

  const handleFilterReset = () => {
    dispatch(getLeadCheckedFreelance(body, "", ""));
    setCountry("");
    setProfesion("");
    setStatus("");
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
            {allProfesionFreelance.map((profesion) => (
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
            <MenuItem value=""></MenuItem>
            {allCountriesFreelance.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-36">
          <label>Level:</label>
          <Select
            value={status}
            onChange={handleChangeStatus}
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
            <MenuItem value="s">
              <em></em>
            </MenuItem>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="aleatorio">Aleatorio</MenuItem>
          </Select>
        </div>
        <div className="flex w-18 items-center justify-center flex-col">
          <div>
            <label>Freelancer:</label>
          </div>
          <div>
            <Checkbox
              id="freelancer"
              onClick={handleChangeFreelancer}
              size="medium"
            />
          </div>
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
