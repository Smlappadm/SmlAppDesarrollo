const Lead = require("../../models/Lead");

const getCorredores = async () => {
  const corredores = await Lead.distinct("corredor_name", { corredor_name: { $ne: "" } });

  const correosSet = new Set();

  corredores.forEach((corredor) => {
    const correo = corredor.split("fullName=")[0];
    correosSet.add(correo);
  });

  const correos = Array.from(correosSet);

  return correos;
};

module.exports = getCorredores;

// const Lead = require("../../models/Lead");

// const getCorredores = async () => {
//   const corredores = await Lead.distinct("corredor", { corredor: { $ne: "" } });

//   const correosSet = new Set();

//   corredores.forEach((corredor) => {
//     const correo = corredor.split("fullName=")[0];
//     correosSet.add(correo);
//   });

//   const correos = Array.from(correosSet);

//   return correos;
// };

// module.exports = getCorredores;
