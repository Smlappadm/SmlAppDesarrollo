const Lead = require("../../models/Lead");

const getLeadChecked100 = async () => {
  const leadChequed = await Lead.find({
    checked: true,
  })
    .limit(100)
    .exec();
  return leadChequed;
};

module.exports = getLeadChecked100;
