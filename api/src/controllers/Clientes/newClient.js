const Clientes = require("../../models/Clientes");

const newClient = async ({ name, email, photo, country, rol, deleted }) => {
  const client = await Clientes.create({
    name,
    email,
    photo,
    country,
    rol,
    deleted,
  });
  return client;
};

module.exports = newClient;
