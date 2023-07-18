import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClienteEmpresa } from "../../redux/actions";
import background from "../../Assets/borde1.png";
import background2 from "../../Assets/borde2.png";

export default function PromocionPago({ tamañoPantalla }) {
  const url = new URL(window.location.href);
  const emailApp = url.searchParams.get("emailApp");
  const { clienteEmpresa } = useSelector((state) => state);
  const [tiempoRestante1, setTiempoRestante1] = useState(0);
  const [tiempoRestante2, setTiempoRestante2] = useState(0);
  const [cliente, setCliente] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClienteEmpresa(emailApp));
  }, [dispatch]);

  useEffect(() => {
    setCliente(clienteEmpresa);
    const fechaActual = new Date();
    const ActualMas2Horas = new Date(
      fechaActual.getTime() + 2 * 60 * 60 * 1000
    );
    const fechaCon24Horas = new Date(
      ActualMas2Horas.getTime() + 24 * 60 * 60 * 1000
    );

    const body = {
      promocion1: ActualMas2Horas,
      promocion2: fechaCon24Horas,
      emailApp: emailApp,
    };
    if (clienteEmpresa?.promocion1 === "") {
      console.log("si");
      seteoPromociones(body);
    }
    if (clienteEmpresa?.promocion1) {
      const time1 = new Date(clienteEmpresa.promocion1);
      const time2 = new Date(clienteEmpresa.promocion2 ?? 0);
      const diferenciaEnMilisegundos1 = time1.getTime() - fechaActual.getTime();
      const diferenciaEnSegundos1 = Math.floor(
        diferenciaEnMilisegundos1 / 1000
      );
      const diferenciaEnMilisegundos2 = time2.getTime() - fechaActual.getTime();
      const diferenciaEnSegundos2 = Math.floor(
        diferenciaEnMilisegundos2 / 1000
      );
      console.log(diferenciaEnSegundos1);
      console.log(diferenciaEnSegundos2);
      setTiempoRestante1(diferenciaEnSegundos1);
      setTiempoRestante2(diferenciaEnSegundos2);
    }
  }, [clienteEmpresa]);

  const seteoPromociones = async (body) => {
    try {
      await axios.put(`/lead/promociones`, body);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Creamos el intervalo para actualizar el tiempo restante cada segundo

    const interval = setInterval(() => {
      setTiempoRestante1((prevTiempoRestante) =>
        prevTiempoRestante > 0 ? prevTiempoRestante - 1 : 0
      );
      setTiempoRestante2((prevTiempoRestante) =>
        prevTiempoRestante > 0 ? prevTiempoRestante - 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [cliente]);

  // Función para convertir segundos a formato HH:mm:ss
  const formatTiempoRestante = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;
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
          ? "w-screen h-screen bg-[#1A1A1A] flex flex-col justify-start items-center"
          : "w-screen h-screen bg-[#020131] flex flex-col justify-center items-center"
      }
      style={styles()}
    >
      <div className="flex flex-col justify-center items-center p-6">
        <p className="text-white text-24 font-bold">{cliente.name}</p>

        <div className="w-full flex flex-col justify-center items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75">
          <p className="text-white">PROMOCIÓN</p>
          <p className="text-white text-3xl">
            {formatTiempoRestante(tiempoRestante1)}
          </p>
          <div className="border border-white w-4/6 flex items-center justify-center p-3">
            <p className="text-white text-3xl ">OFFER</p>
          </div>
        </div>
        {tiempoRestante1 === 0 && (
          <div className="w-full flex flex-col justify-center items-center mt-5">
            <p className="text-white text-3xl">
              {formatTiempoRestante(tiempoRestante2)}
            </p>
            <div className="border border-white w-4/6 flex items-center justify-center p-3">
              <p className="text-white text-3xl ">OFFER 2</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
