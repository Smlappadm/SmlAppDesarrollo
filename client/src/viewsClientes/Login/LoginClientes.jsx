import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../componentsClientes/Login/Login";
import LoginDesktop from "../../componentsClientes/Login/LoginDesktop";
import Register from "../../componentsClientes/Login/Register";
import background from "../../Assets/borde1.png";
import background2 from "../../Assets/borde2.png";
import RegisterDesktop from "../../componentsClientes/Login/RegisterDesktop";

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

  const styles = () => {
    if (tamañoPantalla === "Grande") {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return {
        backgroundImage: `url(${background2})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    }
  };

  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? "w-screen h-screen bg-[#1A1A1A] flex flex-col justify-center items-center"
          : "w-screen h-screen bg-[#020131] flex flex-col justify-center items-center"
      }
      style={styles()}
    >
      <div className="flex flex-col justify-center items-center w-screen">
        {tamañoPantalla === "Pequeña" ? (
          <img
            src="https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
            alt=""
            className="w-40 h-40 absolute left-3 top-3"
            onClick={handleOpenRegister}
          />
        ) : null}

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
        ) : tamañoPantalla === "Pequeña" ? (
          <Register
            handleOpenRegister={handleOpenRegister}
            refeerred={referred}
          />
        ) : (
          <RegisterDesktop
            handleOpenRegister={handleOpenRegister}
            refeerred={referred}
          />
        )}
      </div>
    </div>
  );
}
