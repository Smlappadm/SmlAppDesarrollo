const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = async ({id, amount}) => {


    const payment = await stripe.paymentIntents.create({
      amount: amount, // Precio en centavos (por ejemplo, $1.00)
      currency: "USD",
      payment_method: id, // Aquí debes proporcionar el ID del método de pago
      confirm: true,
    });

    // res.send({
    //   clientSecret: paymentIntent.client_secret, message: "Pago realizado"
    // });
    console.log(7777777)
    return stripe;
  // } catch (error) {
  //   res.send(error.raw.message);
  //   console.log(error.raw.message);
  // }
};

module.exports = createPayment;

