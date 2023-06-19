import { useEffect, useState } from "react";
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
  const [errores, setErrores] = useState({ message: "" });
  const [datos, setDatos] = useState({ nombre: "", email: "", email2:"", pais:"", calle:"", numero:"", cp:""});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setErrores({...errores, message: ""})
    }, 3000);
  }, [loading, errores]);

  const handleChange = (event) => {
  const name = event.target.name
  const value = event.target.value

  setDatos({...datos, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setErrores({ ...errores, message: ""});

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    setLoading(true);
    // console.log(errores);
    // console.log(error);

    // 'Your card number is invalid.'
    // 'Your card number is incomplete.'
    // "Your card's security code is incomplete."
    // "Your card's expiration date is incomplete."

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
        setErrores({ ...errores, message: "" });
        elements.getElement(CardElement).clear();
      } catch (error) {
        setErrores({ ...errores, message: error.message });
        console.log("dsdsf");
        // setErrores({ ...errores, message: error.message });
        // console.log(error);
        console.log(errores.message);
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-80 rounded-lg gap-4"
    >
      {errores.message &&
        errores.message === "Your card number is invalid." && (
          <p className="absolute top-12 text-center">
            Número de tarjeta invalido
          </p>
        )}
      {errores.message &&
        errores.message === "Your card number is incomplete." && (
          <p className="absolute top-12 text-center">Número de tarjeta incompleto</p>
        )}
      {errores.message &&
        errores.message === "Your card's security code is incomplete." && (
          <p className="absolute top-12 text-center">Clave de seguridad incompleta</p>
        )}
      {errores.message &&
        errores.message === "Your card's expiration date is incomplete." && (
          <p className="absolute top-12 text-center">Fecha de expiración incompleta</p>
        )}
      {errores.message &&
        errores.message === "Your card's expiration year is in the past." && (
          <p className="absolute top-12 text-center">Tarjeta expirada</p>
        )}

<div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="nombre"
        onChange={handleChange}
        value={datos.nombre}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Nombre completo"
        />
        </div>
        <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={datos.email}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="email"
      />
      </div>
      <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="email2"
        onChange={handleChange}
        value={datos.email2}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Confirmar email"
      />
       </div>
      <div className="flex gap-2">
      <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="pais"
        onChange={handleChange}
        value={datos.pais}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="País"
      />
      </div>
      <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="calle"
        onChange={handleChange}
        value={datos.calle}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Calle"
      />
  </div>
      </div>
      <div className="flex gap-2">
      <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="numero"
        onChange={handleChange}
        value={datos.numero}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="número"
      />
      </div>
      <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <input
        type="text"
        name="cp"
        onChange={handleChange}
        value={datos.cp}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="CP"
      />
       </div>

      </div>
        <div className="border-2 w-80 rounded-full"></div>
      <div className="border-2 w-full">
<label htmlFor="" className="border-2 w-full text-[13px]" >Nombre completo</label>
      <div className="grid items-center bg-[#2a2a33] w-full h-14 rounded-xl p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#ffffff",
                "::placeholder": {
                  color: "#c2bfbf",
                },
                backgroundColor: "#2a2a33", // Background personalizado
                borderRadius: "10px", // Border radius personalizado
                border: "1px solid #bbbbbb"
              },
              invalid: {
                color: "#f50b51",
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      </div>
      <button
        type="submit"
        disabled={!stripe && errores.message === ""}
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
