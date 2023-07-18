import React, { useState, useEffect } from "react";

export default function PromocionPago() {
  const [tiempoRestante, setTiempoRestante] = useState(3600);

  useEffect(() => {
    // Creamos el intervalo para actualizar el tiempo restante cada segundo
    const interval = setInterval(() => {
      setTiempoRestante((prevTiempoRestante) =>
        prevTiempoRestante > 0 ? prevTiempoRestante - 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
