import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import style from "./CheckoutForm.module.css"
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <form onClick={handleSubmit} className="w-96 h-32">
 <CardElement
       className="text-18 h-32 shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <button disabled={!stripe}>Submit</button>
    </form>
  );
};

export default CheckoutForm;


// import React, {useState} from 'react';
// import {useStripe, useElements, PaymentElement, CartElement} from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const {error} = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: 'https://example.com/order/123/complete',
//       },
//     });


//     if (error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//       setErrorMessage(error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <PaymentElement /> */}
//       <CartElement/>
//       <button disabled={!stripe}>Submit</button>
//       {/* Show error message to your customers */}
//       {/* {errorMessage && <div>{errorMessage}</div>} */}
//     </form>
//   )
// };

// export default CheckoutForm;