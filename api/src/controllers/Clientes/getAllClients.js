const Clientes = require("../../models/Clientes");

const getAllClientes = async () => {
  const clientes = await Clientes.find();
  return clientes;
};

module.exports = getAllClientes;
