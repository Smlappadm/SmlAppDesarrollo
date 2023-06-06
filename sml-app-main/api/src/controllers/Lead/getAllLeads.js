const Lead = require("../../models/Lead");

const getAllLeads = async () => {
  const leads = await Lead.find();
  return leads;
};

module.exports = getAllLeads;
