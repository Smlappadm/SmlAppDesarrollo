const Lead = require("../../models/Lead");

const getAllLeadClasificacion = async (query) => {
  let leadUnchecked = [];
  let limitedLeadRest = [];

  const {
    email,
    names,
    profesion,
    country,
    category,
    marca_personal,
    freelancer,
  } = query;

  const findLeadUnchecked = async (conditions, limit) => {
    return Lead.find(conditions, null, { limit }).lean();
  };

  if (!profesion && !country && !category && !marca_personal) {
    leadUnchecked = await findLeadUnchecked(
      {
        corredor: email,
        checked: false,
      },
      10 // Limit the results to 10
    );
  } else {
    const countryRegex = country ? new RegExp(country, "i") : /.*/;
    const profesionRegex = profesion ? new RegExp(profesion, "i") : /.*/;
    const categoryRegex = category ? new RegExp(category, "i") : /.*/;
    const marca_personalRegex = marca_personal
      ? new RegExp(marca_personal, "i")
      : /.*/;

    leadUnchecked = await findLeadUnchecked(
      {
        corredor: email,
        checked: false,
        country: countryRegex,
        profesion: profesionRegex,
        category: categoryRegex,
        marca_personal: marca_personalRegex,
      },
      10 // Limit the results to 10
    );
  }

  return [...leadUnchecked, ...limitedLeadRest];
};

module.exports = getAllLeadClasificacion;
