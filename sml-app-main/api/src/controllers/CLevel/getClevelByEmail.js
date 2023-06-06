const Clevel = require("../../models/Clevel");

const getClevelByEmail = async (email) => {
  const clevel = await Clevel.findOne({ email: email });

  return clevel;
};

module.exports = getClevelByEmail;
