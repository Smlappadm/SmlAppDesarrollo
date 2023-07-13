const Clientes = require("../../models/Clientes");

const loginClient = async (username) => {
  const client = await Clientes.findOne({ username });
  return client;
};

module.exports = loginClient;
