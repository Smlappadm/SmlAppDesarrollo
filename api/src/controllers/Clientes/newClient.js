const Clientes = require("../../models/Clientes");

const newClient = async ({
  username,
  name,
  email,
  password,
  photo,
  rol,
  deleted,
}) => {
  const client = await Clientes.create({
    username,
    name,
    email,
    photo,
    password,
    rol,
    deleted,
  });
  return client;
};

module.exports = newClient;
