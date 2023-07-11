const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Lead = require("../../models/Lead");

const createPayment = async (emailApp) => {
console.log("entro")
    const infoLead = await Lead.find({emailApp:emailApp})
console.log(infoLead.pagos)

return infoLead.pagos

//   const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`

//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             images: ["https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"],
//             name: name,
//             description: description
//             // description: `cuotas ${cuotasRestantes}/${cuotas}`
//           },
//           currency: "eur",
//           unit_amount: (valorCuota * 100),
//         },
//         quantity: 1,
//       },
//       // {
//       //   price_data: {
//       //     product_data: {
//       //       name: "TV",
//       //     },
//       //     currency: "usd",
//       //     unit_amount: 1000,
//       //   },
//       //   quantity: 2,
//       // },
//     ],
//     mode: "payment",
//     // success_url: "www.google.com.ar",
//     success_url: "http://localhost:5173/clientes-pagos",
//     // cancel_url: "http://localhost:3002/cancel",
//     // success_url: "http://localhost:3001/success",
//     // cancel_url: "http://localhost:3002/cancel",
//     locale: "es",
//   });


//     // await stripe.webhookEndpoints.create({
//     //   url: "https://tu-domino.com/stripe/payment_completed",
//     //   enabled_events: ["checkout.session.completed"],
//     // });
  

// //   console.log(session)


//   return session;
};

module.exports = createPayment;
