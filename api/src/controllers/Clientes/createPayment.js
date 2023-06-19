import stripeImport from "stripe";

const stripe = stripeImport(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (req, res) => {
  // const bookDB = await getBookById(products[0].id)
  // const finalAmount = bookDB.price
  const product = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: "1", //precio
      currency: "usd",
      //   payment_method: product[0].pm,
      payment_method: "",
      confirm: true,
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.send(error.raw.message);
    console.log(error.raw.message);
  }
};

export { paymentIntent };
