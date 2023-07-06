const Lead = require("../../models/Lead");

const asignacionFreelancer = async (data) => {
  const { name, email, leads } = data;
  const parsedLeads = parseInt(leads, 10);

  if (isNaN(parsedLeads) || !Number.isInteger(parsedLeads)) {
    throw new Error("El valor de leads debe ser un número entero");
  }

  const profesiones = await Lead.distinct("profesion");
  const totalProfesiones = profesiones.length;

  const asignacionesPromises = [];
  let counter = 0;

  while (asignacionesPromises.length < parsedLeads) {
    const profesion = profesiones[counter % totalProfesiones];

    const lead = await Lead.findOneAndUpdate(
      {
        profesion,
        checked: false,
        freelancer: false,
        corredor: "",
        status: "Sin contactar",
      },
      {
        $set: {
          vendedor: email,
          vendedor_name: name,
          corredor: email,
          corredor_name: name,
          freelancer: true,
          checked: false,
        },
      },
      { new: true }
    );

    if (lead !== null) {
      asignacionesPromises.push(lead);
    }

    counter++;
  }

  const asignaciones = await Promise.all(asignacionesPromises);

  return asignaciones;
};

module.exports = asignacionFreelancer;

// const Lead = require("../../models/Lead");

// const asignacionFreelancer = async (data) => {
//   const { name, email, leads } = data;
//   const parsedLeads = parseInt(leads, 10);

//   if (isNaN(parsedLeads) || !Number.isInteger(parsedLeads)) {
//     throw new Error("El valor de leads debe ser un número entero");
//   }

//   const profesiones = await Lead.distinct("profesion");
//   const totalProfesiones = profesiones.length;

//   const asignacionesPromises = [];
//   for (let i = 0; i < parsedLeads; i++) {
//     const profesion = profesiones[i % totalProfesiones];

//     const lead = await Lead.findOneAndUpdate(
//       {
//         profesion,
//         checked: false,
//         freelancer: false,
//         corredor: "",
//         status: "Sin contactar",
//       },
//       {
//         $set: {
//           vendedor: email,
//           vendedor_name: name,
//           corredor: email,
//           corredor_name: name,
//           freelancer: true,
//           checked: false,
//         },
//       },
//       { new: true }
//     );

//     asignacionesPromises.push(lead);
//   }

//   const asignaciones = await Promise.all(asignacionesPromises);

//   return asignaciones.filter((lead) => lead !== null);
// };

// module.exports = asignacionFreelancer;
