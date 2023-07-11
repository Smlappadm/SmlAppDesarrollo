import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getAllCategory, getAllFreelancer } from "../../../../../redux/actions";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "20px",
};

export default function ChildModal({ email }) {
  const { freelancer, allCategory } = useSelector((state) => state);
  const [OneFreelancer, setOneFreelancer] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [values, setValues] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    web: "",
    email: "",
    telefono: "",
    categoria: "",
  });

  useEffect(() => {
    dispatch(getAllFreelancer());
    dispatch(getAllCategory());
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        const sortedCountries = countryNames.sort();
        setCountries(sortedCountries);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);
  useEffect(() => {
    if (values.pais !== "") {
      if (values.pais !== "") {
        fetch(`https://restcountries.com/v3.1/name/${values.pais}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const capital = data[0]?.capital[0] || "";
            setCities([capital]);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [values.pais]);

  useEffect(() => {
    const free =
      freelancer && freelancer.filter((free) => free.email === email);
    setOneFreelancer(free);
  }, [freelancer]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      ...values,
    };
    console.log(body);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button variant="contained" sx={{}} onClick={handleOpen}>
        NUEVO CLIENTE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            ...style,
            width: "30%",
            backgroundColor: "#39394b",
            height: "600px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full ">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Añadir clientes!
            </h2>

            <form className="flex flex-col " onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Nombre: </label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="algo"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.nombre}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Categoría: </label>
                  <select
                    type="text"
                    id="categoria"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.categoria}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled selected>
                      Seleccione una categoría
                    </option>
                    {allCategory &&
                      allCategory.map((category) => (
                        <option
                          value={category}
                          key={category}
                          className="text-black"
                        >
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Pais: </label>
                  <select
                    id="pais"
                    className="bg-transparent w-full rounded-lg pl-3 h-full border border-white"
                    value={values.pais}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled selected>
                      Seleccione un país
                    </option>
                    {countries.map((country) => (
                      <option
                        value={country}
                        key={country}
                        className="text-black"
                      >
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Ciudad: </label>
                  <select
                    id="ciudad"
                    className="bg-transparent w-full rounded-lg pl-3 h-full border border-white"
                    value={values.ciudad}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled selected>
                      Seleccione una ciudad
                    </option>
                    {cities.map((city) => (
                      <option value={city} key={city} className="text-black">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Web: </label>
                  <input
                    id="web"
                    type="text"
                    placeholder="algo"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.web}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Email: </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="algo"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.email}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="flex h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Telefono: </label>
                  <input
                    id="telefono"
                    type="text"
                    placeholder="algo"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white text-white"
                    value={values.telefono}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
              <div className="flex justify-around mt-10">
                <button>CLEAN</button>
                <button type="submit">ADD</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
