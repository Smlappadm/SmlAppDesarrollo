const Clientes = require("../../models/Clientes");

const updateClientProfile = async (email, body) => {
  const client = await Clientes.findOneAndUpdate({ email }, body, {
    new: true,
  });
  return client;
};

module.exports = updateClientProfile;
