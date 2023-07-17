const Lead = require("../../models/Lead");
const Employees = require("../../models/Employees");

const updateBannedEmploy = async (email, updatedData) => {
  // const leadsFreelancer = await Lead.find();
  //   console.log(leadsFreelancer);
  const leads = await Lead.find();
console.log(leads.length)

  const employ = await Employees.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  console.log(employ)
  return employ;
};

module.exports = updateBannedEmploy;
