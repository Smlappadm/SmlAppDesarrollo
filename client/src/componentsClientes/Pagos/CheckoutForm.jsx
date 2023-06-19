import { useState } from "react";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import style from "./CheckoutForm.module.css";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    if (!error) {
      console.log("Compra realizada");
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/clientes/payment",
          {
            id,
            amount: 100, //"centavos por cien seria el peso"
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-96 rounded-lg gap-4"
    >
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#dddde2] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Nombre completo"
      />
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#39394B] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="email"
      />
      <div className="grid items-center bg-[#f8f8f8] w-full h-14 rounded-xl p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#1d1d1d",
                "::placeholder": {
                  color: "#000000",
                },
                backgroundColor: "#f8f8f8", // Background personalizado
                borderRadius: "10px", // Border radius personalizado
              },
              invalid: {
                color: "#9e2146",
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="border-2 border-[#07A1F8] bg-[none] w-24 text-white px-5 py-2  rounded-full hover:bg-[#3579b1] flex justify-center"
      >
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-6 h-6  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
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
