import React from "react";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import ConfirmacionPago from "./ConfirmacionPago";
import axios from "axios";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useSelector, useDispatch } from "react-redux";
import { getClienteEmpresa } from "../../redux/actions";
import background from "../../Assets/borde1.png";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";

// require('dotenv').config();

// const { STRIPE_SECRET_KEY } = process.env;
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey =
  "pk_test_51NJhsbGpn5uZGCfpbyEu252jvDVNlqDiljFxifEkG5rAba4tu11lt9wl3m3UP1xFL3tnUGtPxT0KLMjNSnl6SO7o00xs2avzC5";
const stripePromise = loadStripe(stripePublicKey);

export const Pagos = ({ tamañoPantalla }) => {
  const dispatch = useDispatch();
  const { clienteEmpresa } = useSelector((state) => state);
  const [urlPago, setUrlPago] = useState("");
  const [leadEmpresa, setLeadEmpresa] = useState(false);
  // const user = useUser().user;
  // const email = user?.emailAddresses[0]?.emailAddress;

  const styles = () => {
    if (tamañoPantalla === "Grande") {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return null;
    }
  };

  let fullName = localStorage.getItem("fullName");
  let email = localStorage.getItem("email");

  // const options = {
  //     passing the client secret obtained in step 3
  //     clientSecret: STRIPE_SECRET_KEY,
  //     Fully customizable with appearance API.
  //     appearance: {/*...*/},
  //   };

  //   return (
  //     // <Elements stripe={stripePromise} options={options}>
  //         <Elements stripe={stripePromise} >
  //       <CheckoutForm />
  //     </Elements>
  //   );
  // };

  useEffect(() => {
    dispatch(getClienteEmpresa("facutam@gmail.com"));
    if (clienteEmpresa && clienteEmpresa?.name) {
      handlePagoUrlUpdate();
    }
  }, [clienteEmpresa?.name]);

  const handlePagoUrlUpdate = async () => {
    const email = "facutam@gmail.com";
    const response1 = await axios.get(`/lead/leademailapp?emailApp=${email}`);

    const data1 = response1.data;
    setLeadEmpresa(data1);

    if (clienteEmpresa.name) {
      const response2 = await axios.post("/clientes/payment", {
        id: clienteEmpresa._id,
        name: clienteEmpresa.name,
        monto: clienteEmpresa.pagos.monto,
        cuotas: clienteEmpresa.pagos.cuotas,
        cuotasRestantes: clienteEmpresa.pagos.cuotasPagadas,
        valorCuota: clienteEmpresa.pagos.valorCuota,
      });
      const data2 = response2.data;
      setUrlPago(data2.url);
    }

    // console.log(data1);
    // console.log(data2.url);
  };

  // const handleClienteInfo = async (user.emailAddresses) => {
  //   const { data } = await axios.post(
  //     "http://localhost:3001/api/clientes/payment",
  //     {
  //       id,
  //       amount: amount, //"centavos por cien seria el peso"
  //       name,
  //     }
  //   );
  //   setUrlPago(data.url)
  //   console.log(data.url);
  // };
  // console.log(clienteEmpresa)
  return (
    <div className="flex bg-[#020131] gap-5  flex-col justify-start items-center h-screen xl:h-screen w-screen">
      {tamañoPantalla === "Grande" ? (
        <div className="w-full h-1/6">
          <NavBarDesktop />
        </div>
      ) : null}
      {clienteEmpresa && clienteEmpresa.name ? (
        <div className="flex gap-5  flex-col justify-center items-center ">
          <p
            className={
              tamañoPantalla === "Pequeña"
                ? "w-full text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#282828] hover:bg-[#3f437a] cursor-pointer"
                : "w-full text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#D9D9D9] bg-opacity-25"
            }
          >
            {clienteEmpresa?.name && clienteEmpresa?.name}
          </p>
          <div
            className={
              tamañoPantalla === "Pequeña"
                ? "w-full text-[#fff] font-bold flex flex-col justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#282828] hover:bg-[#3f437a] cursor-pointer"
                : "p-3 w-full text-[#fff] font-bold flex flex-col justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#D9D9D9] bg-opacity-25"
            }
          >
            {/* <p className="border-2 text-center text-24 font-extrabold text-white">
            {`Email: ${clienteEmpresa.emailApp}`}
          </p> */}
            <p className="text-center text-16 font-extrabold text-white">
              {`Monto total: €${clienteEmpresa.pagos.monto} `}
            </p>
            <p className=" text-center text-16 font-extrabold text-white">
              {`${clienteEmpresa.pagos.cuotas} cuotas de €${clienteEmpresa.pagos.valorCuota}`}
            </p>
            <p className="text-center text-16 font-extrabold text-white">
              {`Cuotas abonadas: ${clienteEmpresa.pagos.cuotasPagadas}/${clienteEmpresa.pagos.cuotas}`}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      <a
        href={urlPago ? urlPago : "http://localhost:5173/clientes-settings"}
        target="_blanck"
        className=" w-fit px-2 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-2 my-2 bg-[#39394b] hover:bg-[#3f437a] cursor-pointer"
      >
        Pago
      </a>
      {/* <Elements stripe={stripePromise} > */}
      {/* <Elements stripe={stripePromise} options={options}> */}
      {/* <ConfirmacionPago/> */}
      {/* <CheckoutForm /> */}
      {/* </Elements> */}
    </div>
  );
};
