const Lead = require("../../models/Lead");

const getLeadCorredoresCheckedDescargados = async (email) => {
  const leads = await Lead.find({
    corredor: email,
    checked: true,
    descargadosCorredor: { $ne: true },
  }).exec();
  return leads;
};

module.exports = getLeadCorredoresCheckedDescargados;
