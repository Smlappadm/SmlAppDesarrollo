const Lead = require("../../models/Lead");

const getLeadChecked = async () => {
  const leadChequed = await Lead.find({
    checked: true,
    status: {
      $nin: ["No responde", "Agendar 2do llamado", "incidencia"],
    },
  });
  return leadChequed;
};

module.exports = getLeadChecked;
