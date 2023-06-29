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

// require('dotenv').config();

// const { STRIPE_SECRET_KEY } = process.env;
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey =
  "pk_test_51NJhsbGpn5uZGCfpbyEu252jvDVNlqDiljFxifEkG5rAba4tu11lt9wl3m3UP1xFL3tnUGtPxT0KLMjNSnl6SO7o00xs2avzC5";
const stripePromise = loadStripe(stripePublicKey);

export const Pagos = () => {
  const dispatch = useDispatch();
  const { clienteEmpresa } = useSelector((state) => state);
  const [urlPago, setUrlPago] = useState("");
  const [leadEmpresa, setLeadEmpresa] = useState(false);
  // const user = useUser().user;
  // const email = user?.emailAddresses[0]?.emailAddress;
  

  

  let fullName = localStorage.getItem("fullName");
  let email = localStorage.getItem("email");
  console.log(fullName)
  console.log(email)
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
    clienteEmpresa.name && handlePagoUrlUpdate();
  }, [clienteEmpresa.name]);


  const handlePagoUrlUpdate = async () => {
    const email = "facutam@gmail.com";
    const response1 = await axios.get(`/lead/leademailapp?emailApp=${email}`);
    
    const data1 = response1.data;
    setLeadEmpresa(data1);
    
    if(clienteEmpresa.name){
      const response2 = await axios.post("/clientes/payment", {
      id: clienteEmpresa._id,
      name: clienteEmpresa.name,
      monto: clienteEmpresa.pagos.monto,
      cuotas: clienteEmpresa.pagos.cuotas,
      cuotasRestantes: clienteEmpresa.pagos.cuotasRestantes,
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
    <div className="flex bg-[#020131] gap-5  flex-col justify-center items-center h-screen xl:h-screen w-screen">
      {clienteEmpresa ? (
        <div className="flex bg-[#020131] gap-5  flex-col justify-center items-center ">
          <p className="border-2 text-center text-24 font-extrabold text-white">
            {clienteEmpresa?.name && clienteEmpresa?.name}
          </p>
          <p className="border-2 text-center text-24 font-extrabold text-white">
            {`Email: ${clienteEmpresa.emailApp}`}
          </p>
          <p className="border-2 text-center text-24 font-extrabold text-white">
            {`Monto total: C${clienteEmpresa.pagos.monto} `}
          </p>
          <p className="border-2 text-center text-24 font-extrabold text-white">
            {`${clienteEmpresa.pagos.cuotas} cuotas de C${clienteEmpresa.pagos.valorCuota}`}
          </p>
          <p className="border-2 text-center text-24 font-extrabold text-white">
            {`Cuotas restantes: ${clienteEmpresa.pagos.cuotasRestantes}`}
          </p>
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
        className=" w-28 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#39394b] hover:bg-[#3f437a] cursor-pointer"
      >
        Pagar
      </a>
      {/* <Elements stripe={stripePromise} > */}
      {/* <Elements stripe={stripePromise} options={options}> */}
      {/* <ConfirmacionPago/> */}
      {/* <CheckoutForm /> */}
      {/* </Elements> */}
    </div>
  );
};
