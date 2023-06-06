const Corredor = require("../../models/Corredor");

const getCorredorByEmail = async (email) => {
  const regex = new RegExp(email, "i");
  const corredor = await Corredor.findOne({ email: { $regex: regex } })
    .select("leads")
    .limit(10);

  if (corredor && corredor.leads) {
    const filteredLeads = corredor.leads.filter((lead) => !lead.checked);
    return filteredLeads.length > 0 ? filteredLeads : null;
  }

  return null;
};

module.exports = getCorredorByEmail;

// const Corredor = require("../../models/Corredor");

// const getCorredorByEmail = async (email) => {
//   const regex = new RegExp(email, "i");
//   const corredor = await Corredor.findOne({ email: { $regex: regex } })
//     .select("leads")
//     .limit(10);
//   return corredor ? corredor.leads : null;
// };

// module.exports = getCorredorByEmail;
