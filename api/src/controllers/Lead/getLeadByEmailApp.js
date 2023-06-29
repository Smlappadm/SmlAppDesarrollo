const Lead = require("../../models/Lead");

const getLeadByEmailApp = async (emailApp) => {
  const client = await Lead.findOne({emailApp});
  return client;
};




module.exports = getLeadByEmailApp;