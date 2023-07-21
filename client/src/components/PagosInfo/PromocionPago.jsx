import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPromociones, getClienteEmpresa } from "../../redux/actions";
import background from "../../Assets/borde1.png";
import background2 from "../../Assets/borde2.png";
import { Link } from "react-router-dom";

export default function PromocionPago({ tamañoPantalla }) {
  const url = new URL(window.location.href);
  const emailApp = url.searchParams.get("emailApp");
  const { clienteEmpresa } = useSelector((state) => state);
  const [tiempoRestante1, setTiempoRestante1] = useState(0);
  const [tiempoRestante2, setTiempoRestante2] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState({});
  const [cliente, setCliente] = useState({});
  const [promocionActual, setPromocionActual] = useState(0);
  const dispatch = useDispatch();

  const { promociones } = useSelector((state) => state);

  const [promos, setPromos] = useState([]);

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
      2: "Cuotas de 2000€/mes, Total: 4000€",
      4: "Cuotas de 1000€/mes, Total: 4000€",
      10: "Cuotas de 500€/mes, Total: 5000€",
    },
    links: {
      1: "https://buy.stripe.com/bIY5mN5yQ94N3VC4gH",
      2: "https://buy.stripe.com/4gw6qR3qIa8RfEkeVu",
      4: "https://buy.stripe.com/fZe5mN9P62Gp8bSfZs",
      10: "https://buy.stripe.com/28o6qRbXegxf63K14n",
    },
  });
  const [sinPromo, setSinPromo] = useState({
    pagos: {
      1: "Pago único de 5000€",
      2: "Cuotas de 2500€/mes, Total: 5000€",
      4: "Cuotas de 1250€/mes, Total: 5000€",
      6: "Cuotas de 1000€/mes, Total: 6000€",
      12: "Cuotas de 500€/mes, Total: 6000€",
    },
    links: {
      1: "https://buy.stripe.com/cN2cPf3qIbcVcs85kK",
      2: "https://buy.stripe.com/14k16x5yQep7fEk3cE",
      4: "https://buy.stripe.com/cN2dTj9P680J63KaF7",
      6: "https://buy.stripe.com/fZe5mN9P62Gp8bSfZs",
      12: "https://buy.stripe.com/28o6qRbXegxf63K14n",
    },
  });
  const [cuotas, setCuotas] = useState("1");

  const CambiarCuota = (cuota) => {
    setCuotas(cuota);
  };
  useEffect(() => {
    const customPromos = promociones.reduce((result, promo) => {
      if (promo.promocion && promo.promocion.hora) {
        const hora = `promo${promo.promocion.hora}horas`;
        const cuota = promo.promocion.cuota || "default";

        if (!result[hora]) {
          result[hora] = {
            pagos: {},
            links: {},
          };
        }

        result[hora].pagos[cuota] =
          cuota !== "1"
            ? `${promo.promocion.name}, Total: ${promo.promocion.monto}€` || ""
            : promo.promocion.name || "";
        result[hora].links[cuota] = promo.promocion.link || "";
        result[hora].hora = promo.promocion.hora || "";
        result[hora].duracion = ObtenerFecha(parseInt(promo.promocion.hora));
      }

      return result;
    }, {});
    const sortedHours = Object.keys(customPromos).sort((a, b) => {
      return customPromos[a].hora - customPromos[b].hora;
    });
    const sortedCustomPromos = [];
    sortedHours.forEach((hour) => {
      sortedCustomPromos.push(customPromos[hour]);
    });
    console.log(sortedCustomPromos);
    setPromos(sortedCustomPromos);
  }, [promociones]);

  const ObtenerFecha = (horas) => {
    const fechaActual = new Date();
    const fechaLimitePromo = new Date(
      fechaActual.getTime() + horas * 60 * 60 * 1000
    );
    return fechaLimitePromo;
  };

  useEffect(() => {
    const promocionesArmadas = armarPromociones(promos);
    const body = {
      promociones: {
        ...promocionesArmadas.reduce(
          (result, promo) => ({ ...result, ...promo }),
          {}
        ),
      },
      emailApp: emailApp,
    };
    if (
      (clienteEmpresa && !clienteEmpresa?.promociones) ||
      (clienteEmpresa &&
        clienteEmpresa?.promociones.length < body.promociones.length)
    ) {
      console.log("si");
      seteoPromociones(body);
    }
    console.log(promos);
  }, [promos]);

  const armarPromociones = (promos) => {
    const armado = promos.map((promo, index) => {
      return { [`promocion${index + 1}`]: promo.duracion };
    });
    return armado;
  };

  useEffect(() => {
    dispatch(getClienteEmpresa(emailApp));
    dispatch(getAllPromociones());
  }, [dispatch]);

  useEffect(() => {
    setCliente(clienteEmpresa);
    // const fechaActual = new Date();
    // const ActualMas2Horas = new Date(
    //   fechaActual.getTime() + 2 * 60 * 60 * 1000
    // );
    // const fechaCon24Horas = new Date(
    //   ActualMas2Horas.getTime() + 24 * 60 * 60 * 1000
    // );

    // const body = {
    //   promociones: {
    //     promocion1: ActualMas2Horas,
    //     promocion2: fechaCon24Horas,
    //   },
    //   emailApp: emailApp,
    // };
    // if (clienteEmpresa && !clienteEmpresa?.promociones) {
    //   console.log("si");
    //   seteoPromociones(body);
    // }
    // if (clienteEmpresa?.promocion1) {
    //   const time1 = new Date(clienteEmpresa.promocion1);
    //   const time2 = new Date(clienteEmpresa.promocion2 ?? 0);
    //   const diferenciaEnMilisegundos1 = time1.getTime() - fechaActual.getTime();
    //   const diferenciaEnSegundos1 = Math.floor(
    //     diferenciaEnMilisegundos1 / 1000
    //   );
    //   const diferenciaEnMilisegundos2 = time2.getTime() - fechaActual.getTime();
    //   const diferenciaEnSegundos2 = Math.floor(
    //     diferenciaEnMilisegundos2 / 1000
    //   );
    //   setTiempoRestante1(diferenciaEnSegundos1);
    //   setTiempoRestante2(diferenciaEnSegundos2);
    // }

    if (
      clienteEmpresa &&
      clienteEmpresa?.promociones &&
      clienteEmpresa?.promociones.length > 0
    ) {
      const nuevosTiemposRestantes = {}; // Objeto para almacenar los nuevos tiempos restantes
      const fechaActual = new Date();
      let fechaAnterior = null;
      let fechaAnteriorSegundos = 0; // Inicializamos en 0
      clienteEmpresa.promociones.forEach((promocion, index) => {
        const time = new Date(promocion);
        const diferenciaEnMilisegundos = time.getTime() - fechaActual.getTime();
        const diferenciaEnSegundos = Math.floor(
          diferenciaEnMilisegundos / 1000
        );
        const tiempoAcumulado = diferenciaEnSegundos + fechaAnteriorSegundos;
        if (index !== 0) {
          nuevosTiemposRestantes[`promocion${index}`] = diferenciaEnSegundos;
        }
        fechaAnteriorSegundos = tiempoAcumulado; // Actualizamos el valor de fechaAnteriorSegundos para la próxima iteración
        console.log(time);
        console.log(fechaAnterior);
      });
      // Actualizar el estado tiempoRestante con los nuevos tiempos restantes
      setTiempoRestante(nuevosTiemposRestantes);
    }
  }, [clienteEmpresa]);

  useEffect(() => {
    // console.log(tiempoRestante);
  }, [tiempoRestante]);

  const seteoPromociones = async (body) => {
    try {
      await axios.put(`/lead/promociones/promos`, body);
      dispatch(getClienteEmpresa(emailApp));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Creamos el intervalo para actualizar el tiempo restante cada segundo

    // const interval = setInterval(() => {
    //   setTiempoRestante1((prevTiempoRestante) =>
    //     prevTiempoRestante > 0 ? prevTiempoRestante - 1 : 0
    //   );
    //   setTiempoRestante2((prevTiempoRestante) =>
    //     prevTiempoRestante > 0 ? prevTiempoRestante - 1 : 0
    //   );
    // }, 1000);

    // return () => clearInterval(interval);
    // Función para actualizar los tiempos restantes de las promociones
    // Función para actualizar el tiempo restante de una promoción específica
    const actualizarTiemposRestantes = () => {
      setTiempoRestante((prevTiempos) => {
        const nuevosTiempos = { ...prevTiempos }; // Crear una copia del estado actual

        // Variable para rastrear si todas las promociones han llegado a cero
        let todasPromocionesCero = true;

        // Iterar sobre todas las promociones
        for (let i = 1; i <= 10; i++) {
          const promocionKey = `promocion${i}`;
          const siguientePromocionKey = `promocion${i + 1}`;

          if (nuevosTiempos[promocionKey] > 0) {
            // Restar 1 segundo a la promoción actual
            nuevosTiempos[promocionKey] = nuevosTiempos[promocionKey] - 1;
            todasPromocionesCero = false; // Al menos una promoción no ha llegado a cero
          } else if (
            siguientePromocionKey &&
            nuevosTiempos[siguientePromocionKey] > 0
          ) {
            // Si la promoción actual llegó a cero y la siguiente promoción existe y es mayor que cero, restar 1 segundo a la siguiente promoción
            nuevosTiempos[siguientePromocionKey] =
              nuevosTiempos[siguientePromocionKey] - 1;
            todasPromocionesCero = false; // Al menos una promoción no ha llegado a cero
          }
        }

        // Detener el intervalo si todas las promociones han llegado a cero
        if (todasPromocionesCero) {
          clearInterval(interval);
        }

        return nuevosTiempos; // Devolver el nuevo objeto de tiempos restantes
      });
    };

    // Actualizar los tiempos restantes cada 1000 ms (1 segundo)
    const interval = setInterval(actualizarTiemposRestantes, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
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
  const actualizarPromocionActual = () => {
    for (let i = 0; i < promos.length; i++) {
      const promocionKey = `promocion${i}`;
      if (tiempoRestante[promocionKey] > 0) {
        setPromocionActual(i);
        return;
      }
    }
    setPromocionActual(0);
  };
  useEffect(() => {
    actualizarPromocionActual();
  }, [tiempoRestante]);

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
        {promos &&
          promos.map((promo, index) => {
            const promocionKey = `promocion${index}`;

            return (
              <div key={index} className="w-full">
                {tiempoRestante[promocionKey] &&
                tiempoRestante[promocionKey] > 0
                  ? promocionActual === index && (
                      <div
                        className={
                          tamañoPantalla === "Pequeña"
                            ? "w-full flex flex-col justify-center items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75 gap-y-2"
                            : "w-full flex flex-col justify-center items-center mt-5  p-20 rounded-3xl bg-[#D9D9D9] bg-opacity-25 gap-y-5"
                        }
                      >
                        <p className="text-white">PROMOCIÓN</p>
                        <p className="text-white text-3xl">
                          {formatTiempoRestante(tiempoRestante[promocionKey])}
                        </p>
                        <div className="border border-white w-4/6 flex items-center justify-center p-3 rounded-md">
                          {promo.hora === "1" ? (
                            <p className="text-white text-3xl text-center">
                              Desc. -1000€ ({promo.hora} hora)
                            </p>
                          ) : (
                            <p className="text-white text-3xl text-center">
                              Desc. -1000€ ({promo.hora} horas)
                            </p>
                          )}
                        </div>
                        <p className="text-white">CUOTAS</p>
                        <div className="flex justify-evenly items-center text-white ">
                          {Object.keys(promo.pagos).map((cuota, cuotaIndex) => (
                            <div
                              key={cuota}
                              className={
                                cuotas === cuota
                                  ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                                  : "rounded-md border border-white mr-2 font-bold"
                              }
                              onClick={() => CambiarCuota(cuota)}
                            >
                              <p className="py-3 px-5">
                                {Object.keys(promo.pagos)[cuotaIndex]}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="text-white">DETALLE</p>
                        <p className="text-white text-center">
                          {promo.pagos[cuotas]}
                        </p>
                        <Link
                          className={
                            tamañoPantalla === "Pequeña"
                              ? "text-white bg-black w-full py-3 text-18 rounded-2xl text-center"
                              : "text-white bg-blue-950 w-full py-3 text-18 rounded-2xl text-center"
                          }
                          to={promo.links[cuotas]}
                        >
                          Link de Pago
                        </Link>
                      </div>
                    )
                  : null}
              </div>
            );
          })}
        {/* {tiempoRestante1 !== 0 && (
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
              <p className="text-white text-3xl text-center">
                Desc. -1000€ (2 horas)
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
              {promo2horas.pagos[cuotas]}
            </p>
          </div>
        )}
        {tiempoRestante1 === 0 && tiempoRestante2 !== 0 && (
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
        {tiempoRestante1 === 0 && tiempoRestante2 === 0 && (
          <div
            className={
              tamañoPantalla === "Pequeña"
                ? "w-full flex flex-col justify-between items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75 gap-y-2"
                : "w-full flex flex-col justify-between items-center mt-5  p-20 rounded-3xl bg-[#D9D9D9] bg-opacity-25 gap-y-5"
            }
          >
            <p className="text-white">SIN PROMOCIÓN</p>

            <div className="border border-white w-4/6 flex items-center justify-center p-3">
              <p className="text-white text-3xl text-center ">Sin Ofertas!</p>
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
                  cuotas === "6"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("6")}
              >
                <p className="py-3 px-4">6</p>
              </div>
              <div
                className={
                  cuotas === "12"
                    ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold"
                    : "rounded-md border border-white mr-2 font-bold"
                }
                onClick={() => CambiarCuota("12")}
              >
                <p className="py-3 px-4">12</p>
              </div>
            </div>
            <p className="text-white">DETALLE</p>
            <p className="text-white text-center">{sinPromo.pagos[cuotas]}</p>
          </div>
        )} */}
        {/* <Link
          className={
            tamañoPantalla === "Pequeña"
              ? "text-white bg-black w-full py-3 text-18 rounded-2xl text-center"
              : "text-white bg-blue-950 w-full py-3 text-18 rounded-2xl text-center"
          }
          to={
            tiempoRestante1 !== 0
              ? promo2horas.links[cuotas]
              : tiempoRestante2 !== 0 && tiempoRestante1 === 0
              ? promo24horas.links[cuotas]
              : tiempoRestante2 === 0 && tiempoRestante1 === 0
              ? sinPromo.links[cuotas]
              : ""
          }
        >
          Link de Pago
        </Link> */}
      </div>
    </div>
  );
}
