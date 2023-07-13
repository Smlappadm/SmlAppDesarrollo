const Lead = require("../../models/Lead");

const findLeadVendedorName = async (name) => {
  const leads = await Lead.find({
    vendedor: name,
    checked: true,
    view: true,
    status: {
      $nin: ["No responde", "Agendar 2do llamado", "incidencia"],
    },
  }).exec();
  return leads;
};

module.exports = findLeadVendedorName;
