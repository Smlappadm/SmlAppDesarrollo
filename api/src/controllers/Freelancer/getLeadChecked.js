const Lead = require("../../models/Lead");

const getLeadChecked = async (body) => {
  let leadRest = [];
  let leadRestNivel2 = [];
  let leadRestNivel1 = [];
  let leadQuery = {};

  if (body.level == "2") {
    console.log("entro 2");
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "2",
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }

    leadRestNivel2 = await Lead.find(leadQuery).limit(5).exec();
  } else if (body.level === "1") {
    console.log("entro 1");
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "1",
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }

    leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
  } else if (body.level === "aleatorio") {
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
  } else {
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-", "1"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    leadRestNivel2 = await Lead.find(leadQuery).limit(5).exec();

    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-", "2"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }

    let count2 = 0;
    count2 = 5 - leadRestNivel2.length;
    if (count2 > 0 && count2 <= 5) {
      leadRestNivel1 = await Lead.find(leadQuery).limit(count2).exec();
    }
  }

  leadRest = [...leadRestNivel2, ...leadRestNivel1];

  //BUSCA LOS NO RESPONDE --------------------------
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

  return [...leadRest, ...leadsNoRespondenSorted];
  // return [...leadChequedInactive, ...leadRest, ...leadsNoRespondenSorted];
};

module.exports = getLeadChecked;
