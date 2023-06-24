const Lead = require("../../models/Lead");

const getVendedorByEmail = async (email) => {
  const Leads = await Lead.find({ vendedor: email });
  return Leads;
};

module.exports = getVendedorByEmail;
