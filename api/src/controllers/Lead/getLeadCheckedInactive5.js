const Lead = require("../../models/Lead");


const getLeadCheckedInactive5 = async (body) => {

  

  const leadChequedInactive = await Lead.find({
    checked: true,
    vendedor: body.email,
    status: "Sin contactar",
    level: { $nin: ["incidencia", "0", "", "-"] },
  })
    .limit(5)
    .exec();



  const leadChequedInactiveNoResponde = await Lead.find({
    checked: true,
    vendedor: body.email,
    status: "No responde",
    level: { $nin: ["incidencia", "0", "", "-"] },
  });

  const leadsNoRespondenSorted = leadChequedInactiveNoResponde.sort((a, b) => {
    const dateA = a.updatedAt.toISOString();
    const dateB = b.updatedAt.toISOString();

    if (dateA.slice(0, 4) !== dateB.slice(0, 4)) {
      return dateA.slice(0, 4) - dateB.slice(0, 4);
    }

    if (dateA.slice(5, 7) !== dateB.slice(5, 7)) {
      return dateA.slice(5, 7) - dateB.slice(5, 7);
    }

    if (dateA.slice(8, 10) !== dateB.slice(8, 10)) {
      return dateA.slice(8, 10) - dateB.slice(8, 10);
    }

    if (dateA.slice(11, 13) !== dateB.slice(11, 13)) {
      return dateA.slice(11, 13) - dateB.slice(11, 13);
    }

    if (dateA.slice(14, 16) !== dateB.slice(14, 16)) {
      return dateA.slice(14, 16) - dateB.slice(14, 16);
    }

    return 0;
  });

  let count = 0;
  count = 5 - leadChequedInactive.length;
  let leadRest = [];
  let leadRestNivel2 = [];
  let leadRestNivel1 = [];

  if (count) {
    if (count > 0 && count <= 5) {
      leadRestNivel2 = await Lead.find({
        checked: true,
        vendedor: "",
        status: "Sin contactar",
        level: { $nin: ["incidencia", "0", "", "-", "1"] },
      })
        .limit(count)
        .exec();

      let count2 = 0;
      count2 = count - leadRestNivel2.length;
      if (count2) {
        if (count2 > 0 && count2 <= 5) {
          leadRestNivel1 = await Lead.find({
            checked: true,
            vendedor: "",
            status: "Sin contactar",
            level: { $nin: ["incidencia", "0", "", "-", "2"] },
          })
            .limit(count2)
            .exec();
        }
      }

      leadRest = [...leadRestNivel2, ...leadRestNivel1];
      
      if (leadRest.length > 0) {
        await Promise.all(
          leadRest.map(async (element) => {
            element.vendedor = body.email;
            element.vendedor_name = body.name
            await element.save();
          })
        );
      }
    }
  }

  return [
    ...leadChequedInactive,
    ...leadRest,
    ...leadsNoRespondenSorted
  ];
};

module.exports = getLeadCheckedInactive5;
