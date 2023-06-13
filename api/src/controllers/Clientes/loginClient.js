const Clientes = require("../../models/Clientes");

const loginClient = async (username) => {
  const client = await Clientes.findOne({ username });
  console.log(client);
  return client;
};

module.exports = loginClient;
