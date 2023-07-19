import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClienteEmpresa } from "../../redux/actions";
import background from "../../Assets/borde1.png";
import background2 from "../../Assets/borde2.png";
import { Link } from "react-router-dom";

export default function PromocionPago({ tamañoPantalla }) {
  const url = new URL(window.location.href);
  const emailApp = url.searchParams.get("emailApp");
  const { clienteEmpresa } = useSelector((state) => state);
  const [tiempoRestante1, setTiempoRestante1] = useState(0);
  const [tiempoRestante2, setTiempoRestante2] = useState(0);
  const [cliente, setCliente] = useState({});
  const dispatch = useDispatch();
  const [promo24horas, setPromo24horas] = useState({
    pagos: {
      1: "Pago único de 4500€",
      2: "Cuotas de 2250€/mes, Total: 4500€",
      4: "Cuotas de 1125€/mes, Total: 4500€",
      5: "Cuotas de 1000€/mes, Total: 5000€",
      10: "Cuotas de 500€/mes, Total: 5000€",
    },
    links: {
      1: "",
      2: "https://buy.stripe.com/00gdTje5mep777OfZw",
      4: "https://buy.stripe.com/28odTjgdu6WFcs8dRp",
      5: "https://buy.stripe.com/fZe5mN9P62Gp8bSfZs",
      10: "https://buy.stripe.com/28o6qRbXegxf63K14n",
    },
  });
  const [promo2horas, setPromo2horas] = useState({
    pagos: {
      1: "Pago único de 4000€",
      2: "Cuotas de 2000€/mes, Total: 4500€",
      4: "Cuotas de 1000€/mes, Total: 4500€",
      10: "Cuotas de 500€/mes, Total: 5000€",
    },
    links: {
      1: "https://buy.stripe.com/bIY5mN5yQ94N3VC4gH",
      2: "https://buy.stripe.com/4gw6qR3qIa8RfEkeVu",
      4: "https://buy.stripe.com/28odTjgdu6WFcs8dRp",
      10: "https://buy.stripe.com/28o6qRbXegxf63K14n",
    },
  });
  const [cuotas, setCuotas] = useState("1");

  const CambiarCuota = (cuota) => {
    setCuotas(cuota);
  };
  useEffect(() => {
    console.log(cuotas);
  }, [cuotas]);

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
      <div
        className={
          tamañoPantalla === "Pequeña"
            ? "flex flex-col justify-between items-center p-6 h-full w-full"
            : "flex flex-col justify-evenly items-center p-6 h-full w-1/5"
        }
      >
        <p className="text-white text-24 font-bold">{cliente.name}</p>
        {tiempoRestante1 !== 0 && (
          <div
            className={
              tamañoPantalla === "Pequeña"
                ? "w-full flex flex-col justify-center items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75 gap-y-2"
                : "w-full flex flex-col justify-center items-center mt-5  p-20 rounded-3xl bg-[#D9D9D9] bg-opacity-25 gap-y-5"
            }
          >
            <p className="text-white">PROMOCIÓN</p>
            <p className="text-white text-3xl">
              {formatTiempoRestante(tiempoRestante1)}
            </p>
            <div className="border border-white w-4/6 flex items-center justify-center p-3 rounded-md">
              <p className="text-white text-3xl ">OFFER</p>
            </div>
          </div>
        )}
        {tiempoRestante1 === 0 && (
          <div
            className={
              tamañoPantalla === "Pequeña"
                ? "w-full flex flex-col justify-between items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75 gap-y-2"
                : "w-full flex flex-col justify-between items-center mt-5  p-20 rounded-3xl bg-[#D9D9D9] bg-opacity-25 gap-y-5"
            }
          >
            <p className="text-white">PROMOCIÓN</p>
            <p className="text-white text-24 font-extrabold">
              {formatTiempoRestante(tiempoRestante2)}
            </p>
            <div className="border border-white w-4/6 flex items-center justify-center p-3">
              <p className="text-white text-3xl text-center ">
                Desc. -500€ (24 horas)
              </p>
            </div>
            <p className="text-white">CUOTAS</p>
            <div className="flex justify-evenly items-center text-white ">
              <div
                className={
                  cuotas === "1"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("1")}
              >
                <p className="py-3 px-5">1</p>
              </div>
              <div
                className={
                  cuotas === "2"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("2")}
              >
                <p className="py-3 px-4">2</p>
              </div>
              <div
                className={
                  cuotas === "4"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("4")}
              >
                <p className="py-3 px-4">4</p>
              </div>
              <div
                className={
                  cuotas === "5"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("5")}
              >
                <p className="py-3 px-4">5</p>
              </div>
              <div
                className={
                  cuotas === "10"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("10")}
              >
                <p className="py-3 px-4">10</p>
              </div>
            </div>
            <p className="text-white">DETALLE</p>
            <p className="text-white text-center">
              {promo24horas.pagos[cuotas]}
            </p>
          </div>
        )}
        <Link
          className={
            tamañoPantalla === "Pequeña"
              ? "text-white bg-black w-full py-3 text-18 rounded-2xl text-center"
              : "text-white bg-blue-950 w-full py-3 text-18 rounded-2xl text-center"
          }
          to={promo24horas.links[cuotas]}
        >
          Link de Pago
        </Link>
      </div>
    </div>
  );
}
