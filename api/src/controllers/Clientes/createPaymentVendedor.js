const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



const createPayment = async ({ id, name, monto, cuotas, cuotasRestantes, valorCuota, link }) => {

//     const infoLead = await find({emailApp:emailApp})
// console.log(infoLead.pagos)

// return infoLead.pagos

  const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            images: ["https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"],
            name: name,
            description: description
            // description: `cuotas ${cuotasRestantes}/${cuotas}`
          },
          currency: "eur",
          unit_amount: (valorCuota * 100),
        },
        quantity: 1,
      },
      // {
      //   price_data: {
      //     product_data: {
      //       name: "TV",
      //     },
      //     currency: "usd",
      //     unit_amount: 1000,
      //   },
      //   quantity: 2,
      // },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    // payment_intent_data: {
    //   payment_method_options: {
    //     card: {
    //       installments: cuotas // Establece el número de cuotas del pago
    //     }
    //   },
    //   description: description // Establece el detalle del pago
    // },
    // success_url: "www.google.com.ar",
    success_url: link,
    // cancel_url: "http://localhost:3002/cancel",
    // success_url: "http://localhost:3001/success",
    // cancel_url: "http://localhost:3002/cancel",
    locale: "es",
  });


    // await stripe.webhookEndpoints.create({
    //   url: "https://tu-domino.com/stripe/payment_completed",
    //   enabled_events: ["checkout.session.completed"],
    // });
  

//   console.log(session)


  return session;
};

module.exports = createPayment;


// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const createPayment = async ({ id, name, monto, cuotas, cuotasRestantes, valorCuota, link, token }) => {
//   const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`;

//   // 1. Crear un cliente en Stripe y adjuntar la tarjeta de crédito
//   const customer = await stripe.customers.create({
//     email: customerEmail,
//     source: token,
//   });

//   // 2. Crear la sesión de pago utilizando el cliente
//   const session = await stripe.checkout.sessions.create({
//     customer: customer.id,
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             images: ["https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"],
//             name: name,
//             description: description,
//           },
//           currency: "eur",
//           unit_amount: valorCuota * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     payment_method_types: ["card"],
//     success_url: link,
//     locale: "es",
//   });

//   return session;
// };

// module.exports = createPayment;





