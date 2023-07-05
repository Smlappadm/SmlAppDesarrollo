const Lead = require("../../models/Lead");

const getAllLeadClasificacion = async (query) => {
  let leadUnchecked = [];
  let limitedLeadRest = [];
  let leadRest = [];

  const { email, names, profesion, country, category, marca_personal } = query;

  const findLeadUnchecked = async (conditions, limit) => {
    return Lead.find(conditions, null, { limit }).lean();
  };

  const updateLeadRest = async (conditions, updates) => {
    return Lead.updateMany(conditions, updates);
  };

  if (!profesion && !country && !category && !marca_personal) {
    console.log(names);
    leadUnchecked = await findLeadUnchecked(
      {
        corredor: email,
        corredor_name: names,
        checked: false,
        view: true,
      },
      10
    );

    const count = 10 - leadUnchecked.length;
    if (count > 0) {
      limitedLeadRest = await findLeadUnchecked(
        {
          checked: false,
          view: false,
          corredor: "",
          corredor_name: "",
        },
        count
      );

      if (limitedLeadRest.length > 0) {
        const updates = limitedLeadRest.map((element) => ({
          updateOne: {
            filter: { _id: element._id },
            update: { corredor: email, corredor_name: names, view: true },
          },
        }));

        await Lead.bulkWrite(updates);
      }
    }
  } else {
    await updateLeadRest(
      { corredor: email, checked: false },
      {
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
          instagram: "",
        },
      }
    );

    const countryRegex = country ? new RegExp(country, "i") : /.*/;
    const profesionRegex = profesion ? new RegExp(profesion, "i") : /.*/;
    const categoryRegex = category ? new RegExp(category, "i") : /.*/;
    const marca_personalRegex = marca_personal
      ? new RegExp(marca_personal, "i")
      : /.*/;

    leadUnchecked = await findLeadUnchecked(
      {
        corredor: email,
        corredor_name: names,
        checked: false,
        view: true,
        country: countryRegex,
        profesion: profesionRegex,
        category: categoryRegex,
        marca_personal: marca_personalRegex,
      },
      10
    );

    const count = 10 - leadUnchecked.length;
    if (count > 0) {
      limitedLeadRest = await findLeadUnchecked(
        {
          checked: false,
          view: false,
          corredor: "",
          corredor_name: "",
          country: countryRegex,
          profesion: profesionRegex,
          category: categoryRegex,
          marca_personal: marca_personalRegex,
        },
        count
      );

      if (limitedLeadRest.length > 0) {
        const updates = limitedLeadRest.map((element) => ({
          updateOne: {
            filter: { _id: element._id },
            update: { corredor: email, corredor_name: names, view: true },
          },
        }));

        await Lead.bulkWrite(updates);
      }
    }
  }

  return [...leadUnchecked, ...limitedLeadRest];

};

module.exports = getAllLeadClasificacion;