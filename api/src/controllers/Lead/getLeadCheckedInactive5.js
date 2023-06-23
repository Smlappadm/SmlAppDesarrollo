const Lead = require("../../models/Lead");

const getLeadCheckedInactive5 = async (email) => {

  const leadChequedInactiveNivel2 = await Lead.find({
    checked: true,
    vendedor: email,
    status: "Sin contactar",
    level: { $nin: ["incidencia", "0", "", "-", "1"] },
  })
    .limit(5)
    .exec();

    const countNivel2 = 5 - leadChequedInactiveNivel2.length;


    // console.log(countNivel2)
    let leadChequedInactiveNivel1 = [];

  if(leadChequedInactiveNivel2.length < 5){
  leadChequedInactiveNivel1 = await Lead.find({
    checked: true,
    vendedor: email,
    status: "Sin contactar",
    level: { $nin: ["incidencia", "0", "", "-", "2"] },
  })
    .limit(countNivel2 - leadChequedInactiveNivel1.length)
    .exec();
  }
console.log(countNivel2 - leadChequedInactiveNivel1.length)
const leadChequedInactive = [...leadChequedInactiveNivel2, ...leadChequedInactiveNivel1.slice(0, 5)]

  const leadChequedInactiveNoResponde = await Lead.find({
    checked: true,
    vendedor: email,
    status: "No responde",
    level: { $nin: ["incidencia", "0", "", "-"] },
  });



const leadsNoRespondenSorted = leadChequedInactiveNoResponde.sort((a, b) => {
  

  const dateA = a.updatedAt.toISOString();
  const dateB = b.updatedAt.toISOString()
  
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
  if (count) {
    if (count > 0 && count <= 5) {
      leadRest = await Lead.find({
        checked: true,
        vendedor: "",
        status: "Sin contactar",
        level: { $nin: ["incidencia", "0", "", "-"] },
      })
        .limit(count)
        .exec();

      if (leadRest.length > 0) {
        await Promise.all(
          leadRest.map(async (element) => {
            element.vendedor = email;
            await element.save();
          })
        );
      }
    }
  }

  return [
    ...leadChequedInactive,

    ...leadRest,
    ...leadsNoRespondenSorted,
  ];
};

module.exports = getLeadCheckedInactive5;
