const Lead = require("../../models/Lead");
const Vendedor = require("../../models/Vendedor");

const getLeadVendedorById = async (id) => {
  const leadResult = await Lead.findOne({ _id: id });

  const vendedor = await Vendedor.findOne({ email: leadResult.vendedor });

  const data = {
    lead: leadResult,
    Vendedor_Name: {
      name: vendedor.name,
      email: vendedor.email,
      _id: vendedor._id,
    },
  };

  return data;
};

module.exports = getLeadVendedorById;
