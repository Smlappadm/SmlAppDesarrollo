const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = async ({
  id,
  name,
  monto,
  cuotas,
  cuotasRestantes,
  valorCuota,
}) => {
  //     const infoLead = await find({emailApp:emailApp})
  // console.log(infoLead.pagos)

  // return infoLead.pagos

  const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            images: [
              "https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp",
            ],
            name: name,
            description: description,
          },
          currency: "eur",
          unit_amount: valorCuota * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    payment_intent_data: {
      payment_method_options: {
        card: {
          installments: cuotas, // Establece el número de cuotas del pago
        },
      },
      description: description, // Establece el detalle del pago
    },
    success_url: "https://sml-app.vercel.app/clientes-pagos",
    locale: "es",
  });

  return session;
};

module.exports = createPayment;
