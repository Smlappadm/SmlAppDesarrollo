const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Lead = require("../../models/Lead");

const createPayment = async (emailApp) => {
console.log("entro")
    const infoLead = await Lead.findOne({emailApp:emailApp})


  const description = `cuotas ${infoLead.pagos.cuotasRestantes + 1}/${infoLead.pagos.cuotas}`

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            images: ["https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"],
            name: infoLead.name,
            description: description
            // description: `cuotas ${cuotasRestantes}/${cuotas}`
          },
          currency: "eur",
          unit_amount: (infoLead.pagos.valorCuota * 100),
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
    // success_url: "www.google.com.ar",
    success_url: "https://sml-app-api.onrender.com/pago-ok",
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
