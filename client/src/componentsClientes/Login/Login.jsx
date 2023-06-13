import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ handleOpenRegister, handleJoin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async () => {
    const response = await axios.get(`/clientes/username?username=${username}`);
    const client = response.data;
    console.log(client);
    if (username === client.username && password === client.password) {
      navigate("/clientes-home");
    } else {
      console.log("todo mal");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#020131] flex flex-col justify-start items-center">
      <img
        src="https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
        alt=""
      />
      <div className="flex flex-col w-3/4 gap-y-4">
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
        <div className="flex flex-col items-center gap-y-4 mt-4">
          <button
            className="bg-[#07a1f8] rounded-2xl px-3 text-black"
            onClick={handleSubmit}
          >
            Ingresar
          </button>
          <div className="flex ">
            <p>¿No tienes cuenta?</p>
            <button onClick={handleOpenRegister} className="text-blue-600 ml-1">
              Crea una!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
