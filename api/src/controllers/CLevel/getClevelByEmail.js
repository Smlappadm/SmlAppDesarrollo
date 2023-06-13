const CLevel = require("../../models/CLevel");

const getClevelByEmail = async (email) => {
  const clevel = await CLevel.findOne({ email: email });

  return clevel;
};

module.exports = getClevelByEmail;
