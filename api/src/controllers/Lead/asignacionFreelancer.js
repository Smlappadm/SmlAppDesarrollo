const Lead = require("../../models/Lead");

const asignacionFreelancer = async (data) => {
  const { name, email, leads } = data;

  // Verificar si leads es un número y luego convertirlo a entero
  const parsedLeads = parseInt(leads, 10);

  // Verificar si parsedLeads es un entero válido
  if (isNaN(parsedLeads) || !Number.isInteger(parsedLeads)) {
    throw new Error("El valor de leads debe ser un número entero");
  }

  const profesiones = await Lead.distinct("profesion");

  const asignaciones = [];

  for (let i = 0; i < parsedLeads; i++) {
    const profesion = profesiones[i];

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

    asignaciones.push(lead);
  }

  return asignaciones.filter((lead) => lead !== null);
};

module.exports = asignacionFreelancer;
