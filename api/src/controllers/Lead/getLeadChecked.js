const Lead = require("../../models/Lead");

const getLeadChecked = async () => {
  const leadChequed = await Lead.find({
    checked: true,
    freelancer: {$ne: true},
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

module.exports = getLeadChecked;
