const Lead = require("../../models/Lead");

const getLeadDiscard = async () => {
  const leadChequed = await Lead.find({
    checked: true,
    status: "discard_bot",
  });
  return leadChequed;
};

module.exports = getLeadDiscard;
