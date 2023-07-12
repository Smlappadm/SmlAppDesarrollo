import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getAllCategory, getAllFreelancer } from "../../../../../redux/actions";
import axios from "axios";
import { red } from "@mui/material/colors";
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
  const [errors, setErrors] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    web: "",
    email: "",
    telefono: "",
    categoria: "",
  });
  const [error, setError] = useState(false);
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
    const free =
      freelancer && freelancer.filter((free) => free.email === email);
    setOneFreelancer(free);
    console.log(free);
  }, [freelancer]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validateURL = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };
  const validaciones = (id) => {
    if (id === "email") {
      if (!validateEmail(values.email)) {
        // Si el email no es válido, muestra un mensaje de error
        setErrors(
          (prevErrors) => ({
            ...prevErrors,
            email: "Ingrese un email válido",
          }),
          console.log("b")
        );
      } else {
        setErrors(
          (prevErrors) => ({
            ...prevErrors,
            email: "",
          }),
          console.log("a")
        );
      }
    }
    if (id === "web") {
      if (!validateURL(values.web)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          web: "Ingrese una URL válida",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          web: "",
        }));
      }
    }
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    validaciones(id);
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  useEffect(() => {}, [errors]);
  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    const body = {
      name: values.nombre,
      category: values.categoria,
      province: values.pais,
      country: values.pais,
      city: values.ciudad,
      email: values.email,
      url: values.web,
      telephone: values.telefono,
      checked: false,
      view: false,
      profesion: values.categoria,
      corredor: OneFreelancer && OneFreelancer[0].email,
      corredor_name: OneFreelancer && OneFreelancer[0].name,
      instagra: "",
      level: "",
      freelancer: true,
      vendedor: OneFreelancer && OneFreelancer[0].email,
      vendedor_name: OneFreelancer && OneFreelancer[0].name,
      from: OneFreelancer && OneFreelancer[0].email,
      status: "Sin contactar",
      marca_personal: "No",
    };

    if (
      values.nombre === "" ||
      values.pais === "" ||
      values.ciudad === "" ||
      values.web === "" ||
      values.email === "" ||
      values.telefono === "" ||
      values.categoria === ""
    ) {
      AddLeadError();
    } else {
      if (
        errors.nombre !== "" ||
        errors.pais !== "" ||
        errors.ciudad !== "" ||
        errors.web !== "" ||
        errors.email !== "" ||
        errors.telefono !== "" ||
        errors.categoria !== ""
      ) {
        AddLeadError();
      } else {
        try {
          await axios.post("/lead/new", body);
          setValues({
            nombre: "",
            pais: "",
            ciudad: "",
            web: "",
            email: "",
            telefono: "",
            categoria: "",
          });
          setOpen(false);
          AddLeads();
        } catch (error) {
          console.log({ error: error.message });
          AddLeadError();
        }
      }
    }
    //console.log(body);
  };
  const AddLeads = () => {
    toast.success(`✔ Se creo Lead exitosamente!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleClean = () => {
    setValues({
      nombre: "",
      pais: "",
      ciudad: "",
      web: "",
      email: "",
      telefono: "",
      categoria: "",
    });
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
            height: "700px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full justify-center items-center">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Añadir clientes!
            </h2>

            <form className="flex flex-col " onSubmit={handleSubmitAdd}>
              <div className="flex flex-col gap-3">
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Nombre: </label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Ingrese el nombre del nuevo cliente"
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
                    className={
                      values.categoria !== ""
                        ? "bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                        : "bg-transparent w-full rounded-lg pl-3 h-full border border-white text-gray-400"
                    }
                    value={values.categoria}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled selected>
                      Seleccione una categoría del cliente
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
                    className={
                      values.pais !== ""
                        ? "bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                        : "bg-transparent w-full rounded-lg pl-3 h-full border border-white text-gray-400"
                    }
                    value={values.pais}
                    onChange={(event) => handleChange(event)}
                  >
                    <option value="" disabled selected>
                      Seleccione el país del cliente
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
                  <input
                    id="ciudad"
                    type="text"
                    placeholder="Ingrese la cuidad de el cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.ciudad}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Web: </label>
                  <input
                    id="web"
                    type="text"
                    placeholder="Ingrese el sitio web"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.web}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.web !== "" && <span>{errors.web}</span>}
                <div className="flex  h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Email: </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Ingrese el email del cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                    value={values.email}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.email !== "" && <span>{errors.email}</span>}
                <div className="flex h-10  items-center  px-3 gap-x-2">
                  <label className="w-24">Telefono: </label>
                  <input
                    id="telefono"
                    type="number"
                    placeholder="Ingrese numero de Telefono del cliente"
                    className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white text-white"
                    value={values.telefono}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
              <div className="flex justify-around mt-10">
                <Button variant="contained" type="submit" sx={{}}>
                  AGREGAR
                </Button>
              </div>
            </form>
            <Button
              variant="contained"
              onClick={handleClean}
              sx={{
                backgroundColor: "red",
                width: "fit-content",
                opacity: 0.7,
                "&:hover": {
                  backgroundColor: "red",
                  opacity: 1,
                },
              }}
            >
              LIMPIAR
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
