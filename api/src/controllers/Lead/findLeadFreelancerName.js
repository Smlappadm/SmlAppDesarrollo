const Lead = require("../../models/Lead");

const findLeadFreelancerName = async (name) => {
  const leads = await Lead.find({
    corredor_name: name,
    freelancer: true,
  }).exec();
  return leads;
};

module.exports = findLeadFreelancerName;
