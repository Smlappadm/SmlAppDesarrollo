import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@mui/material";
import {
  getAllCategory,
  getAllCountries,
  getAllProfesion,
} from "../../../../../redux/actions";

export default function InputRunner({ getLeadClasificacion, email, names }) {
  const dispatch = useDispatch();
  const [profesion, setProfesion] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [marca_personal, setMarca_personal] = useState("");
  const [freelancer, setFreelancer] = useState("undefined");

  const { allProfesion } = useSelector((state) => state);
  const { allCategory } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllProfesion());
    dispatch(getAllCategory());
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleChangeProfesion = (event) => {
    let value = event.target.value;
    setProfesion(value);
  };

  const handleChangeCategory = (event) => {
    let value = event.target.value;
    setCategory(value);
  };

  const handleChangeCountries = (event) => {
    let value = event.target.value;
    setCountry(value);
  };

  const handleChangeNombrePropio = (event) => {
    setMarca_personal(event.target.checked ? "SI" : "");
  };

  const handleChangeFreelancer = (event) => {
    setFreelancer(event.target.checked ? email : "undefined");
  };

  const handleFilterClick = () => {
    dispatch(
      getLeadClasificacion(
        email,
        names,
        profesion,
        category,
        country,
        marca_personal,
        freelancer
      )
    );
  };

  const handleFilterReset = () => {
    setProfesion("");
    setCategory("");
    setCountry("");
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
      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col">
          <label>Profesion:</label>
          <Select
            value={profesion || ""}
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
            <MenuItem value="">Profesion</MenuItem>
            {allProfesion.map((profesion) => (
              <MenuItem key={profesion} value={profesion}>
                {profesion}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Categoria:</label>
          <Select
            value={category || ""}
            onChange={handleChangeCategory}
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
            <MenuItem value="">Categoria</MenuItem>
            {allCategory.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Paises:</label>
          <Select
            value={country || ""}
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
            <MenuItem value="">Pais</MenuItem>
            {allCountries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex w-12 items-center justify-center flex-col">
          <div>
            <label>Propio:</label>
          </div>
          <div>
            <Checkbox
              id="propio"
              onClick={handleChangeNombrePropio}
              size="medium"
            />
          </div>
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
