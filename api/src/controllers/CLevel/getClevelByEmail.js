const Clevel = require("../../models/CLevel");

const getClevelByEmail = async (email) => {
  const clevel = await Clevel.findOne({ email: email });

  return clevel;
};

module.exports = getClevelByEmail;
