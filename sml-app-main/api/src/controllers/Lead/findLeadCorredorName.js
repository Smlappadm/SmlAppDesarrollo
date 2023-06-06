const Lead = require("../../models/Lead");

const findLeadCorredorName = async (name) => {
  const regex = name ? new RegExp(name, "i") : /.*/;
  const leads = await Lead.find({
    corredor: regex,
    checked: true,
    view: true,
    status: {
      $nin: ["No responde", "Agendar 2do llamado", "incidencia"],
    },
  }).exec();
  return leads;
};

module.exports = findLeadCorredorName;
