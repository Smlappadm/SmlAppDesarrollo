const Lead = require("../../models/Lead");

const findLeadFreelancerName = async (name) => {
  const regex = name ? new RegExp(name, "i") : /.*/;
  const leads = await Lead.find({
    corredor_name: regex,
    freelancer: true,
  }).exec();
  console.log(leads);
  return leads;
};

module.exports = findLeadFreelancerName;
