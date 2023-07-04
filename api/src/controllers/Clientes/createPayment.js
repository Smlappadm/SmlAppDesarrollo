const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const createPayment = async ({id, amount}) => {

// console.log(id)
// console.log(amount)
//     const payment = await stripe.paymentIntents.create({
//       amount: amount, // Precio en centavos (por ejemplo, $1.00)
//       currency: "USD",
//       payment_method: id, // Aquí debes proporcionar el ID del método de pago
//       confirm: true,
//       mode: "payment",
//       success_url: "http://www.google.com.ar"
//     });

//     // res.send({
//     //   clientSecret: paymentIntent.client_secret, message: "Pago realizado"
//     // });
//     return payment;
//   // } catch (error) {
//   //   res.send(error.raw.message);
//   //   console.log(error.raw.message);
//   // }
// };

const createPayment = async ({ id, name, monto, cuotas, cuotasRestantes, valorCuota }) => {
  const description = `cuotas ${cuotasRestantes}/${cuotas}`
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
    success_url: "http://www.google.com.ar",
    // cancel_url: "http://localhost:3002/cancel",
    // success_url: "http://localhost:3001/success",
    // cancel_url: "http://localhost:3002/cancel",
    locale: "es",
  });

    // Agregar un webhook para escuchar el evento de pago completado
    await stripe.webhookEndpoints.create({
      url: "https://tu-domino.com/stripe/payment_completed",
      enabled_events: ["checkout.session.completed"],
    });
  

//   console.log(session)


  return session;
};

module.exports = createPayment;
