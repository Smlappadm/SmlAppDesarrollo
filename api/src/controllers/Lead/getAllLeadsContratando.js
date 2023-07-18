const Lead = require("../../models/Lead");

const getAllLeadsContratando = async () => {
  const leads = await Lead.find({ status: "contratando" });
  return leads;
};

module.exports = getAllLeadsContratando;
