const Lead = require("../../models/Lead");

const getAllLeadClasificacion = async ({query}) => {

  const { email, names, profesion, country, category, marca_personal } = query;

  
  const leads = await Lead.find({checked: false});
  return leads;

};

module.exports = getAllLeadClasificacion;
