const Lead = require("../../models/Lead");
const Employees = require("../../models/Employees");

const updateBannedEmploy = async (email, updatedData) => {

  const leads = await Lead.updateMany({corredor: email, status: "Sin contactar", freelancer: true}, {
    $set: {
      level: "",
      status: "Sin contactar",
      status_op: "",
      llamados: 0,
      vendedor: "",
      vendedor_name: "",
      corredor: "",
      corredor_name: "",
      checked: false,
      view: false,
      deleted: false,
      freelancer: false,
    },
  });
console.log(leads)

  const employ = await Employees.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return employ;
};

module.exports = updateBannedEmploy;
