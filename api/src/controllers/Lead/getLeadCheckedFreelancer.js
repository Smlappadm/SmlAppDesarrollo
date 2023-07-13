const Lead = require("../../models/Lead");

const getLeadCheckedFreelancer = async () => {
  const leadChequed = await Lead.find({
    checked: true,
    freelancer: true,
    status: {
      $nin: ["incidencia", "discard", "discard_bot"],
    },
  });
  return leadChequed;
};

module.exports = getLeadCheckedFreelancer;
