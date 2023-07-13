const Clientes = require("../../models/Clientes");

const setReferred = async ({ email, referred }) => {
  const referido = await Clientes.findOneAndUpdate(
    { email: referred },
    { $addToSet: { referred: email } },
    { new: true }
  );
  return referido;
};
module.exports = setReferred;
