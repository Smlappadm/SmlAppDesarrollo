const Clientes = require("../../models/Clientes");

const setReferred = async ({ email, referred }) => {
  const referido = await Clientes.findOneAndUpdate(
    { email: referred },
    { $addToSet: { referred: email } },
    { new: true }
  );
  console.log(referred);
  return referido;
};
module.exports = setReferred;
