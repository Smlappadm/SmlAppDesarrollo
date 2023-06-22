import React from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm"
import ConfirmacionPago from "./ConfirmacionPago";
// require('dotenv').config();

// const { STRIPE_SECRET_KEY } = process.env;
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = 'pk_test_51NJhsbGpn5uZGCfpbyEu252jvDVNlqDiljFxifEkG5rAba4tu11lt9wl3m3UP1xFL3tnUGtPxT0KLMjNSnl6SO7o00xs2avzC5'
const stripePromise = loadStripe(stripePublicKey);

export const Pagos = () => {

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



  return (
    <div className="flex bg-[#020131] gap-5  flex-col justify-center items-center h-full xl:h-screen w-screen">

    {/* <Elements stripe={stripePromise} options={options}> */}
    <Elements stripe={stripePromise} >
      {/* <ConfirmacionPago/> */}
      <CheckoutForm />
    </Elements>
    </div>
  );
};

