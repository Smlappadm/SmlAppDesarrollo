const Vendedor = require("../../models/Vendedor");

const postVendedor = async ({
  name,
  email,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  leads_contacted,
  hired_leads,
  declined_leads,
  unanswered_leads,
  rol,
  deleted,
}) => {
  const vendedor = await Vendedor.create({
    name,
    email,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    leads_contacted,
    hired_leads,
    declined_leads,
    unanswered_leads,
    rol,
    deleted,
  });
  return vendedor;
};

module.exports = postVendedor;
