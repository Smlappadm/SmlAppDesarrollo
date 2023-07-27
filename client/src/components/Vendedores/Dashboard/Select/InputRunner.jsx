import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getAllProfesion } from "../../../../redux/actions";

export default function InputName({
  body,
  getLeadCheckedInactive5,
  emailAddress,
  profesion,
  setProfesion,
}) {
  const dispatch = useDispatch();
  profesion = { profesion };
  setProfesion = { setProfesion };
  country = { country };
  setCountry = { setCountry };
  level = { level };
  setLevel = { setLevel };
  freelancer = { freelancer };
  setFreelancer = { setFreelancer };

  const [checkFreelancer, setCheckFreelancer] = useState(false);

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
  const handleChangeStatus = (event) => {
    let value = event.target.value;
    setLevel(value);
  };

  //AGREGADO
  const handleChangeFreelancer = (event) => {
    setFreelancer(event.target.checked ? emailAddress : "");
    setCheckFreelancer(!checkFreelancer);
  };

  const handleFilterClick = () => {
    dispatch(
      getLeadCheckedInactive5(body, profesion, country, level, freelancer)
    );
  };

  const handleFilterReset = () => {
    dispatch(getLeadCheckedInactive5(body, "", ""));
    setCountry("");
    setProfesion("");
    setLevel("");
    setFreelancer("");
    setCheckFreelancer(false);
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
            {allProfesion.map((profesion, index) => (
              <MenuItem key={index} value={profesion}>
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
            {allCountries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-36">
          <label>Nivel:</label>
          <Select
            value={level}
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
              <em>None</em>
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="aleatorio">Aleatorio</MenuItem>
          </Select>
        </div>
        <div className="flex w-24 items-center justify-center flex-col">
          <div>
            <label>Mis clientes</label>
          </div>
          <div>
            <Checkbox
              id="freelancer"
              checked={checkFreelancer}
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
