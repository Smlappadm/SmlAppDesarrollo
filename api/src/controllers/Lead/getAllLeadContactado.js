const Lead = require("../../models/Lead");

const getAllLeadContactado = async () => {
  const leads = await Lead.find({ status: "Contactado" });
  return leads;
};

module.exports = getAllLeadContactado;
