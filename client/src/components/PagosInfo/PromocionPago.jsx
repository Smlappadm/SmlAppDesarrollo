import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPromociones,
  getClienteEmpresa,
  UpdateClienteEmpresa,
} from "../../redux/actions";
import background from "../../Assets/borde1.webp";
import background2 from "../../Assets/borde2.webp";
import { Link } from "react-router-dom";
import ModalConfirmacion from "./ModalConfirmacion";
import Pagos from "../../componentsClientes/Pagos/Pagos.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function PromocionPago({ tamañoPantalla }) {
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const emailApp = url.searchParams.get("emailApp");
  const [promos, setPromos] = useState([]);
  const [cuotas, setCuotas] = useState("1");
  const [cuota, setCuota] = useState("1");
  const [cliente, setCliente] = useState({});
  const [tiempoRestante, setTiempoRestante] = useState({});
  const [promocionActual, setPromocionActual] = useState(0);
  const [todasPromocionesCero, setTodasPromocionesCero] = useState(false);
  const { clienteEmpresa, promociones } = useSelector((state) => state);

  const SendLeadAlert = () => {
    toast.success("✔ Pago seleccionado correctamente!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const SendErrorUpdateAlert = () => {
    toast.error(
      "Error al seleccionar el pago! Intente nuevamente o comuniquese con el comercial",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const CambiarCuota = (cuota, index, cuotaIndex) => {
    setCuotas(`${cuota}-${index}-${cuotaIndex}`);
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
    const promoEdicion =
      promociones &&
      promociones.filter(
        (promo) =>
          promo.promocion.edicion === true && promo.promocion.active === true
      );
    const promoSinEdicion =
      promociones &&
      promociones.filter(
        (promo) =>
          promo.promocion.edicion === false && promo.promocion.active === true
      );
    const promocionesEdit =
      clienteEmpresa && clienteEmpresa.edicion === true
        ? promoEdicion
        : promoSinEdicion;
    const customPromos = promocionesEdit.reduce((result, promo) => {
      if (promo.promocion) {
        const hora = `promo${promo.promocion.hora}horas`;
        const cuota = promo.promocion.cuota || "default";

        if (!result[hora]) {
          result[hora] = {
            pagos: {},
            links: {},
            total: {},
          };
        }

        result[hora].pagos[cuota] = promo.promocion.name || "";
        result[hora].total[cuota] = parseInt(promo.promocion.monto) || "";
        result[hora].links[cuota] = promo.promocion.link || "";
        result[hora].hora = promo.promocion.hora || "";
        result[hora].descuento = promo.promocion.descuento || "";
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
  }, [promociones, clienteEmpresa]);

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
    const todasPromocionesCeroFilter = promos.some((promo, index) => {
      const promocionKey = `promocion${index}`;
      if (index !== 0) {
        return tiempoRestante[promocionKey] && tiempoRestante[promocionKey] > 0;
      }
    });
    if (!todasPromocionesCeroFilter) {
      setTodasPromocionesCero(true);
    } else if (todasPromocionesCeroFilter) {
      setTodasPromocionesCero(false);
    }
  }, [tiempoRestante]);

  const pressLinkButtonHandler = async (linkDePago) => {
    if (!linkDePago) {
      return;
    }

    const body = {
      id: clienteEmpresa._id,
      linkPago: linkDePago,
    };
    try {
      const response = await axios.put(`/lead/setpago`, body);
      dispatch(getClienteEmpresa(emailApp));
      SendLeadAlert();
    } catch (error) {
      SendErrorUpdateAlert();
      console.log("Error al seleccionar el pago");
    }
  };
  const setStripeData = (total, promo, tipo, cuotas, promoParametro) => {
    const body = {
      cuotas: cuotas,
      cuotaDetail: promo,
      precio: total,
      promocion: tipo,
      link: promoParametro,
    };

    dispatch(UpdateClienteEmpresa(emailApp, body));
  };
  if (clienteEmpresa && clienteEmpresa.linkActivado) {
    return (
      <div
        className={
          tamañoPantalla === "Pequeña"
            ? "w-screen h-screen bg-[#1A1A1A] flex flex-col justify-center items-center gap-8"
            : "w-screen h-screen bg-[#020131] flex flex-col justify-center items-center gap-8"
        }
        style={styles()}
      >
        <div
          className={
            tamañoPantalla === "Pequeña"
              ? "flex flex-col justify-center items-center p-6 h-full w-full gap-8"
              : "flex flex-col justify-center items-center p-6 h-full w-1/5 gap-8"
          }
        >
          <p className="text-white text-24 font-bold whitespace-nowrap text-center">
            {cliente && cliente.name}
          </p>

          {/* <Pagos emailApp={emailApp} /> */}
          <Link
            className={
              tamañoPantalla === "Pequeña"
                ? "text-white bg-black w-full py-3 text-18 rounded-2xl text-center"
                : "text-white bg-blue-950 w-full py-3 text-18 rounded-2xl text-center hover:bg-blue-600"
            }
            to={clienteEmpresa.linkPago}
            target="_blank"
          >
            Realizar Pago
          </Link>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div
      className={
        tamañoPantalla === "Pequeña"
          ? "w-screen h-screen bg-[#1A1A1A] flex flex-col justify-start items-center"
          : "w-screen h-screen bg-[#020131] flex flex-col justify-center items-center"
      }
      style={styles()}
    >
      <p className="text-white text-24 font-bold mt-10">
        {cliente && cliente.name}
      </p>
      <div
        className={
          tamañoPantalla === "Pequeña"
            ? "flex flex-col justify-center items-center p-6 h-full w-full"
            : "flex flex-row justify-center items-center p-6 h-full w-3/5 gap-5 "
        }
      >
        {clienteEmpresa &&
          !clienteEmpresa.linkActivado &&
          promos &&
          promos.map((promo, index) => {
            const promocionKey = `promocion${index}`;

            return (
              <div
                key={index}
                className={
                  tamañoPantalla === "Pequeña"
                    ? "w-full flex flex-col justify-between items-center bg-black p-8 rounded-3xl bg-opacity-75 h-[500px]"
                    : "w-full flex flex-col justify-between items-center p-8 rounded-3xl bg-[#57016C80] bg-opacity-50 h-[500px] "
                }
              >
                <p className="text-white text-center w-full">
                  {promo.hora ? `PROMOCIÓN ${promo.hora} HORAS` : "PVP"}
                </p>

                {/* RELOJ */}
                <p className="text-white text-3xl">
                  {promocionKey !== "promocion0"
                    ? promo.hora && tiempoRestante[promocionKey] >= 0
                      ? formatTiempoRestante(tiempoRestante[promocionKey])
                      : "00:00:00"
                    : null}
                </p>

                <div className="flex flex-col justify-evenly items-center text-white w-full">
                  {Object.keys(promo.pagos).map((cuota, cuotaIndex) => (
                    <div
                      key={cuota}
                      className={
                        cuotas === `${cuota}-${index}-${cuotaIndex}`
                          ? "  mr-2 bg-blue-500 text-black font-bold  w-full flex items-center rounded-lg cursor-pointer"
                          : "  mr-2 font-bold  w-full cursor-pointer flex items-center rounded-lg"
                      }
                      onClick={
                        promocionKey === "promocion0"
                          ? () => (
                              CambiarCuota(cuota, index, cuotaIndex),
                              setCuota(cuota)
                            )
                          : tiempoRestante[promocionKey] > 0
                          ? () => (
                              CambiarCuota(cuota, index, cuotaIndex),
                              setCuota(cuota)
                            )
                          : null
                      }
                    >
                      <p className="py-3 pl-5 w-8">
                        {`${Object.keys(promo.pagos)[cuotaIndex]}`}
                      </p>
                      <p className="">{`- ${
                        promo.pagos[Object.keys(promo.pagos)[cuotaIndex]]
                      }`}</p>
                    </div>
                  ))}
                </div>
                {/* <p className="text-white">DETALLE</p>
                <p className="text-white text-center">{promo.pagos[cuotas]}</p> */}
                <ModalConfirmacion
                  tiempo={tiempoRestante}
                  promokey={promocionKey}
                  tamañoPantalla={tamañoPantalla}
                  pressLinkButtonHandler={pressLinkButtonHandler}
                  promo={promo.pagos[cuota]}
                  total={promo.total[cuota]}
                  promoParametro={promo.links[cuota]}
                  cuotas={cuota}
                  tipo={promo.hora ? `PROMOCIÓN ${promo.hora} HORAS` : "PVP"}
                  setStripeData={setStripeData}
                />
              </div>
            );
          })}

        {/* {todasPromocionesCero && (
          <div
            className={
              tamañoPantalla === "Pequeña"
                ? "w-full flex flex-col justify-center items-center mt-5 bg-black p-5 rounded-3xl bg-opacity-75 gap-y-2"
                : "w-full flex flex-col justify-center items-center mt-5  p-20 rounded-3xl bg-[#D9D9D9] bg-opacity-25 gap-y-5"
            }
          >
            <p className="text-white">SIN PROMOCIÓN</p>

            <div className="border border-white w-5/6 flex items-center justify-center p-3 rounded-md">
              <p className="text-white text-3xl text-center">Sin Descuento</p>
            </div>
            <p className="text-white">CUOTAS</p>
            <div className="flex justify-evenly items-center text-white ">
              {Object.keys(
                promos[0] && promos[0].pagos ? promos[0].pagos : ""
              ).map((cuota, cuotaIndex) => (
                <div
                  key={cuota}
                  className={
                    cuotas === cuota
                      ? "rounded-md border border-black mr-2 bg-blue-500 text-black font-bold cursor-pointer"
                      : "rounded-md border border-white mr-2 font-bold cursor-pointer"
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
            <p className="text-white text-center">
              {promos[0] && promos[0].pagos ? promos[0].pagos[cuotas] : null}
            </p>
            <ModalConfirmacion
              tamañoPantalla={tamañoPantalla}
              pressLinkButtonHandler={pressLinkButtonHandler}
              promo={promos[0] && promos[0].pagos[cuotas]}
              promoParametro={promos[0] && promos[0].links[cuotas]}
            />
          </div>
        )} */}
      </div>
      <ToastContainer />
    </div>
  );
}
