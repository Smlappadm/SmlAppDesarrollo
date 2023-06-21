const Clientes = require("../../models/Clientes");

const newClient = async ({
  username,
  name,
  email,
  password,
  photo,
  rol,
  referred,
}) => {
  const client = await Clientes.create({
    username,
    name,
    email,
    photo,
    password,
    rol,
    deleted: false,
  });

  return client;
};

module.exports = newClient;
