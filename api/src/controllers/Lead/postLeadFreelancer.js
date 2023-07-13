const Lead = require("../../models/Lead");

const postLeadFreelancer = async (data) => {
  const lead = Lead.create(data);

  return lead;
};

module.exports = postLeadFreelancer;
