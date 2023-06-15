const Lead = require("../../models/Lead");

const findLeadCorredorNameAllInfo = async (name, month, year, fromDay, toDay) => {

  const regex = name ? new RegExp(name, "i") : /.*/;
  const query = {
    corredor: regex,
    checked: true,
    view: true,
    status: {
      $nin: ["No responde", "Agendar 2do llamado", "incidencia"],
    },
  };

  if (month && year && fromDay && toDay) {
    const startDate = new Date(year, month - 1, fromDay, 0, 0, 0); 
    const endDate = new Date(year, month - 1, toDay, 23, 59, 59); 
    query.updatedAt = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  const leads = await Lead.find(query).exec();
  return leads;
};

module.exports = findLeadCorredorNameAllInfo;
