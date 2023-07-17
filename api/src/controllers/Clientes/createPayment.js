// Importamos la librería de Stripe y la configuramos con la clave secreta almacenada en la variable de entorno STRIPE_SECRET_KEY
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Función asincrónica para crear un pago utilizando la pasarela de pago Stripe
const createPayment = async ({
  id,
  name,
  monto,
  cuotas,
  cuotasRestantes,
  valorCuota,
}) => {
  // Creamos la descripción para el pago basada en las cuotas restantes y el total de cuotas
  const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`;

  // Creamos una sesión de pago en Stripe
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            images: [
              // Imagen del producto, en este caso, una URL de imagen
              "https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp",
            ],
            name: name, // Nombre del producto
            description: description, // Descripción del producto basada en las cuotas restantes y el total de cuotas
          },
          currency: "eur", // Moneda del precio
          unit_amount: valorCuota * 100, // Monto total del precio en centavos (el precio debe estar en la misma moneda que se establece arriba)
        },
        quantity: 1, // Cantidad del producto (en este caso, siempre es 1)
      },
    ],
    mode: "payment", // Modo de la sesión de pago (pago único)
    payment_method_types: ["card"], // Métodos de pago permitidos (en este caso, solo se permite tarjeta)
    payment_intent_data: {
      payment_method_options: {
        card: {
          installments: cuotas, // Establece el número de cuotas del pago en la tarjeta
        },
      },
      description: description, // Establece el detalle del pago
    },
    success_url: "https://sml-app.vercel.app/clientes-pagos", // URL a la que se redirigirá al usuario después de un pago exitoso
    locale: "es", // Configura el idioma de la interfaz de pago de Stripe en español
  });

  return session; // Devolvemos la sesión de pago creada por Stripe
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = createPayment;
