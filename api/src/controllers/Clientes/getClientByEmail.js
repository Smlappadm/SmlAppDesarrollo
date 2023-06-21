const Clientes = require("../../models/Clientes");

const getClientByEmail = async (email) => {
  const client = await Clientes.findOne({ email });
  return client;
};

module.exports = getClientByEmail;
