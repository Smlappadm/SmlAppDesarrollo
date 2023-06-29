import React from "react";
import {useState, useEffect} from "react"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm"
import ConfirmacionPago from "./ConfirmacionPago";
import axios from "axios"
import { useClerk, useUser } from "@clerk/clerk-react";

// require('dotenv').config();

// const { STRIPE_SECRET_KEY } = process.env;
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = 'pk_test_51NJhsbGpn5uZGCfpbyEu252jvDVNlqDiljFxifEkG5rAba4tu11lt9wl3m3UP1xFL3tnUGtPxT0KLMjNSnl6SO7o00xs2avzC5'
const stripePromise = loadStripe(stripePublicKey);

export const Pagos = () => {
  const [urlPago, setUrlPago] = useState("");
  const { user } = useUser();
  const userEmail =
    user && user.emailAddresses && user.emailAddresses[0].emailAddress;
  console.log(user.fullName)
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
  handlePagoUrlUpdate(1234, 20000, "Cuota 1/20 SML IA");
}, []);


const handlePagoUrlUpdate = async (id, amount, name) => {
  // const { data } = 

  const { data } = await axios.post(
    "http://localhost:3001/api/clientes/payment",
    {
      id,
      amount: amount, //"centavos por cien seria el peso"
      name,
    }
  );
  setUrlPago(data.url)
  console.log(data.url);
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

  return (
    <div className="flex bg-[#020131] gap-5  flex-col justify-center items-center h-screen xl:h-screen w-screen">

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

