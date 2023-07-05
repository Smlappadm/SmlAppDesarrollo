const Lead = require("../../models/Lead");

const getLeadCheckedFreelancer = async () => {
  const leadChequed = await Lead.find({
    checked: true,
    freelancer: true,
    status: {
      $nin: [
        "No responde",
        "Agendar 2do llamado",
        "incidencia",
        "discard",
        "discard_bot",
      ],
    },
  });
  return leadChequed;
};

module.exports = getLeadCheckedFreelancer;
