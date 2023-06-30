import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../componentsClientes/Login/Login";
import LoginDesktop from "../../componentsClientes/Login/LoginDesktop";
import Register from "../../componentsClientes/Login/Register";

export default function Home({ tamañoPantalla }) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [referred, setReferred] = useState("");
  const location = useLocation();
  const redirectUrl = new URLSearchParams(location.search).get("redirect_url");
  const inicio = redirectUrl ? redirectUrl.indexOf("ref=") + 4 : "";
  const ref = redirectUrl && inicio !== 3 ? redirectUrl.slice(inicio) : "";

  useEffect(() => {
    setReferred(ref);
  }, [ref]);

  const handleJoin = () => {
    navigate("/clientes-home");
  };
  const handleOpenRegister = () => {
    setRegister(!register);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-[#020131]  to-blue-950  flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-96">
        <img
          src="https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
          alt=""
          className="w-40 h-40"
          onClick={handleOpenRegister}
        />
        {register === false ? (
          tamañoPantalla === "Pequeña" ? (
            <Login
              handleOpenRegister={handleOpenRegister}
              handleJoin={handleJoin}
            />
          ) : (
            <LoginDesktop
              handleOpenRegister={handleOpenRegister}
              handleJoin={handleJoin}
            />
          )
        ) : (
          <Register
            handleOpenRegister={handleOpenRegister}
            refeerred={referred}
          />
        )}
      </div>
    </div>
  );
}
