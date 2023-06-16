import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css"
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
    <form onClick={handleSubmit} className="flex flex-col justify-center items-center w-96 rounded-lg gap-4">
        <div className="grid items-center bg-[#39394B] w-96 h-fit rounded-xl p-3">

        <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
              color: "#ffffff",
              "::placeholder": {
                color: "#ffffff",
              },
              backgroundColor: "#39394B", // Background personalizado
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

      <button disabled={!stripe} className="border-2 border-[#07A1F8] bg-[#07A1F8] w-fit text-white px-5 py-2  rounded-full">Buy</button>
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