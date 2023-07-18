const Corredor = require("../../models/Corredor");

const getCorredorByEmail = async (email) => {
  
  // console.log(email);
  const corredor = await Corredor.findOne({ email: email });
  return corredor;
};

module.exports = getCorredorByEmail;
