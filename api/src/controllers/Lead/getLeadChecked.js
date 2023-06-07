const Lead = require("../../models/Lead");

const getLeadChecked = async () => {
  const leadChequed = await Lead.find({
    checked: true,
  });
  return leadChequed;
};

module.exports = getLeadChecked;
