import React, { useState } from "react";
import axios from "axios";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

export default function Register({ handleOpenRegister }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showView, setShowView] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
  });

  const handlePasswordView = () => {
    setShowView(!showView);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return "Por favor, ingresa un correo electrónico válido";
    }
    return "-";
  };
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (!uppercaseRegex.test(password) || !numberRegex.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula y un número";
    }
    if (password.length < 8 || password.length > 16) {
      return "La contraseña debe tener entre 8 y 16 caracteres";
    }
    return "-";
  };

  let body = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateErrors = { ...errors };
    if (name === "") {
      updateErrors.name = "Por favor, ingresa un nombre";
    }
    if (name !== "") {
      updateErrors.name = "-";
    }
    if (username === "") {
      updateErrors.username = "Por favor, ingresa un usuario";
    }
    if (username !== "") {
      updateErrors.username = "-";
    }
    if (password === "") {
      updateErrors.password = "Por favor, ingresa una contraseña";
    } else {
      updateErrors.password = validatePassword(password);
    }
    if (email === "") {
      updateErrors.email = "Por favor, ingresa un correo electrónico";
    } else {
      updateErrors.email = validateEmail(email);
    }
    setErrors(updateErrors);
    console.log(errors);
    body = {
      username,
      name,
      password,
      email,
      photo: "",
      rol: "cliente",
    };
    console.log(body);
    if (
      errors.username === "-" &&
      errors.name === "-" &&
      errors.password === "-" &&
      errors.email === "-"
    ) {
      await axios.post("/clientes/new", body);
      console.log("Formulario enviado");
      setUsername("");
      setEmail("");
      setName("");
      setPassword("");
      handleOpenRegister();
    } else {
      console.log("murio");
    }
  };

  return (
    <form className="flex flex-col w-3/4 gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="font-bold ml-2 mb-2" htmlFor="">
          Usuario:
        </label>
        <input
          className="rounded-md bg-[#404062] h-7 pl-2"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Ingresar Usuario"
        />
        <span className="text-red-400 text-[12px] text-center">
          {errors.username}
        </span>
      </div>
      <div className="flex flex-col">
        <label className="font-bold ml-2" htmlFor="">
          Nombre:
        </label>
        <input
          className="rounded-md bg-[#404062] h-7 pl-2"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Ingresar Nombre"
        />
        <span className="text-red-400 text-[12px] text-center">
          {errors.name}
        </span>
      </div>
      <div className="flex flex-col">
        <label className="font-bold ml-2" htmlFor="">
          Contraseña:
        </label>
        <div className="flex flex-row rounded-md bg-[#404062] h-7 justify-between items-center">
          <input
            className="rounded-md bg-[#404062] h-7 pl-2 w-full"
            type={showView === false ? "password" : "text"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Ingresar Contraseña"
          />
          {showView === false ? (
            <IoEyeSharp
              className="pr-2 text-[2rem]"
              onClick={handlePasswordView}
            />
          ) : (
            <IoEyeOffSharp
              className="pr-2 text-[2rem]"
              onClick={handlePasswordView}
            />
          )}
        </div>
        <span className="text-red-400 text-[12px] text-center">
          {errors.password}
        </span>
      </div>
      <div className="flex flex-col">
        <label className="font-bold ml-2" htmlFor="">
          Correo Electronico:
        </label>
        <input
          className="rounded-md bg-[#404062] h-7 pl-2"
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Ingresar Correo"
        />
        <span className="text-red-400 text-[12px] text-center">
          {errors.email}
        </span>
      </div>
      <div className="flex flex-col items-center gap-y-4 mt-4">
        <button
          className="bg-[#07a1f8] rounded-2xl px-3 text-black"
          type="submit"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}
