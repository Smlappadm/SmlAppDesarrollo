const Lead = require("../../models/Lead");

const getLeadUnchecked = async () => {
  const leadUnchecked = await Lead.find({ checked: false });
  return leadUnchecked;
};

module.exports = getLeadUnchecked;
