import React, { useState } from "react";
import axios from "axios";

export default function Register({ handleOpenRegister }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      console.log("Por favor, ingresa un correo electrónico válido");
      return false;
    }
    return true;
  };
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (!uppercaseRegex.test(password) || !numberRegex.test(password)) {
      console.log(
        "La contraseña debe contener al menos una letra mayúscula y un número"
      );
      return false;
    }
    if (password.length < 8 || password.length > 16) {
      console.log("La contraseña debe tener entre 8 y 16 caracteres");
      return false;
    }
    return true;
  };

  let body = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      console.log("Por favor, ingresa un usuario");
      return;
    }
    if (name === "") {
      console.log("Por favor, ingresa un nombre");
      return;
    }
    if (password === "") {
      console.log("Por favor, ingresa una contraseña");
      return;
    }
    if (!validatePassword(password)) {
      return;
    }
    if (email === "") {
      console.log("Por favor, ingresa un correo electrónico");
      return;
    }
    if (!validateEmail(email)) {
      return;
    }
    body = {
      username,
      name,
      password,
      email,
      photo: "",
      rol: "cliente",
    };
    console.log(body);
    await axios.post("/clientes/new", body);
    console.log("Formulario enviado");
  };

  return (
    <div className="w-screen h-screen bg-[#020131] flex flex-col justify-start items-center">
      <img
        src="https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
        alt=""
        onClick={handleOpenRegister}
      />
      <form className="flex flex-col w-3/4 gap-y-4" onSubmit={handleSubmit}>
        <label className="font-bold ml-2" htmlFor="">
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
        <label className="font-bold ml-2" htmlFor="">
          Contraseña:
        </label>
        <input
          className="rounded-md bg-[#404062] h-7 pl-2"
          type="text"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Ingresar Contraseña"
        />
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
        <div className="flex flex-col items-center gap-y-4 mt-4">
          <button
            className="bg-[#07a1f8] rounded-2xl px-3 text-black"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}
