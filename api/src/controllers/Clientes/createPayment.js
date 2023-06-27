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

const createPayment = async ({ id, amount, name }) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: name,
          },
          currency: "usd",
          unit_amount: amount,
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
  });

  console.log(session);
  return { url: session.url };
};

module.exports = createPayment;
