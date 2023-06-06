const Lead = require("../../models/Lead");

const getLeadCorredorChecked = async (email) => {
  const leads = await Lead.find({ corredor: email, checked: true }).exec();
  return leads;
};

module.exports = getLeadCorredorChecked;
