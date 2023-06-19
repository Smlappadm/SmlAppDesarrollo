const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (req, res) => {
  console.log("asdasdasdasdasd");

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // Precio en centavos (por ejemplo, $1.00)
      currency: "usd",
      payment_method: "", // Aquí debes proporcionar el ID del método de pago
      confirm: true,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.send(error.raw.message);
    console.log(error.raw.message);
  }
};

module.exports = { paymentIntent };

