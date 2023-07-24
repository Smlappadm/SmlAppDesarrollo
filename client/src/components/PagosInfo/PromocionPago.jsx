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
  const [tiempoRestante, setTiempoRestante] = useState({});
  const [cliente, setCliente] = useState({});
  const [promocionActual, setPromocionActual] = useState(0);
  const dispatch = useDispatch();

  const { promociones } = useSelector((state) => state);

  const [promos, setPromos] = useState([]);

  const [cuotas, setCuotas] = useState("1");

  const CambiarCuota = (cuota) => {
    setCuotas(cuota);
  };

  useEffect(() => {
    dispatch(getClienteEmpresa(emailApp));
    dispatch(getAllPromociones());
  }, [dispatch]);

  const ObtenerFecha = (horas) => {
    const fechaActual = new Date();
    const fechaLimitePromo = new Date(
      fechaActual.getTime() + horas * 60 * 60 * 1000
    );
    return fechaLimitePromo;
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
    setPromos(sortedCustomPromos);
  }, [promociones]);

  const armarPromociones = (promos) => {
    const armado = promos.map((promo, index) => {
      return { [`promocion${index + 1}`]: promo.duracion };
    });
    return armado;
  };

  const seteoPromociones = async (body) => {
    try {
      await axios.put(`/lead/promociones/promos`, body);
      dispatch(getClienteEmpresa(emailApp));
    } catch (error) {
      console.log(error.message);
    }
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
      console.log(promos);

      seteoPromociones(body);
    }
  }, [promos]);

  useEffect(() => {
    setCliente(clienteEmpresa);

    if (
      clienteEmpresa &&
      clienteEmpresa?.promociones &&
      clienteEmpresa?.promociones.length > 0
    ) {
      const nuevosTiemposRestantes = {};
      const fechaActual = new Date();
      let fechaAnterior = null;
      let fechaAnteriorSegundos = 0;
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
        fechaAnteriorSegundos = tiempoAcumulado;
      });

      setTiempoRestante(nuevosTiemposRestantes);
    }
  }, [clienteEmpresa]);

  useEffect(() => {
    const actualizarTiemposRestantes = () => {
      setTiempoRestante((prevTiempos) => {
        // Comprobar si todos los tiempos han llegado a cero
        const todasPromocionesCero = Object.values(prevTiempos).every(
          (tiempo) => tiempo <= 0
        );

        if (todasPromocionesCero) {
          // Detener el intervalo si todas las promociones han llegado a cero
          clearInterval(interval);
          return prevTiempos; // Devolver el estado actual sin hacer modificaciones
        } else {
          // Si no todas las promociones han llegado a cero, crear una copia del estado actual
          const nuevosTiempos = { ...prevTiempos };

          // Iterar sobre todas las promociones y restar 1 segundo si el tiempo es mayor a cero
          for (let i = 1; i <= 10; i++) {
            const promocionKey = `promocion${i}`;
            if (
              prevTiempos[promocionKey] ||
              prevTiempos[promocionKey] === "0"
            ) {
              nuevosTiempos[promocionKey] = Math.max(
                0,
                prevTiempos[promocionKey] - 1
              );
            }
          }

          console.log(nuevosTiempos);
          return nuevosTiempos; // Devolver el nuevo objeto de tiempos restantes
        }
      });
    };

    // Actualizar los tiempos restantes cada 1000 ms (1 segundo)
    const interval = setInterval(actualizarTiemposRestantes, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [cliente]);

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
                          target="_blank"
                        >
                          Link de Pago
                        </Link>
                      </div>
                    )
                  : null}
              </div>
            );
          })}
        <div
          className={
            tamañoPantalla === "Pequeña"
              ? "w-full flex flex-col justify-center items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75 gap-y-2"
              : "w-full flex flex-col justify-center items-center mt-5  p-20 rounded-3xl bg-[#D9D9D9] bg-opacity-25 gap-y-5"
          }
        >
          <p className="text-white">SIN PROMOCIÓN</p>

          <div className="border border-white w-4/6 flex items-center justify-center p-3 rounded-md">
            <p className="text-white text-3xl text-center">Sin Descuento</p>
          </div>
          <p className="text-white">CUOTAS</p>
          <div className="flex justify-evenly items-center text-white ">
            {Object.keys(promos[0].pagos).map((cuota, cuotaIndex) => (
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
                  {Object.keys(promos[0].pagos)[cuotaIndex]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-white">DETALLE</p>
          <p className="text-white text-center">{promos[0].pagos[cuotas]}</p>
          <Link
            className={
              tamañoPantalla === "Pequeña"
                ? "text-white bg-black w-full py-3 text-18 rounded-2xl text-center"
                : "text-white bg-blue-950 w-full py-3 text-18 rounded-2xl text-center"
            }
            to={promos[0].links[cuotas]}
            target="_blank"
          >
            Link de Pago
          </Link>
        </div>
      </div>
    </div>
  );
}
