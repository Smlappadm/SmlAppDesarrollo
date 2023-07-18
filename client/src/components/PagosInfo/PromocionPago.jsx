import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClienteEmpresa } from "../../redux/actions";

export default function PromocionPago() {
  const url = new URL(window.location.href);
  const emailApp = url.searchParams.get("emailApp");
  const { clienteEmpresa } = useSelector((state) => state);
  const [tiempoRestante, setTiempoRestante] = useState(3600);
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
    console.log(ActualMas2Horas);
  }, [clienteEmpresa]);

  useEffect(() => {
    // Creamos el intervalo para actualizar el tiempo restante cada segundo
    console.log(cliente);
    const interval = setInterval(() => {
      setTiempoRestante((prevTiempoRestante) =>
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

  return (
    <div className="h-screen w-screen bg-pink-400">
      <div className="flex flex-col justify-center items-center p-4">
        <p className="text-white">PROMOCIÓN</p>
        <p className="text-white">{cliente.name}</p>

        <div className="w-full flex flex-col justify-center items-center mt-5">
          <p className="text-white text-3xl">
            {formatTiempoRestante(tiempoRestante)}
          </p>
          <div className="border border-white w-4/6 flex items-center justify-center p-3">
            <p className="text-white text-3xl ">OFFER</p>
          </div>
        </div>
      </div>
    </div>
  );
}
