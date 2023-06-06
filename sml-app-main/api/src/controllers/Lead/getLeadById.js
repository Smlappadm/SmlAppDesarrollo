const Lead = require("../../models/Lead");

const getLeadById = async (id) => {
  const lead = await Lead.findById(id);
  return lead;
};

module.exports = getLeadById;
