const Lead = require("../../models/Lead");

const cleanValueClevel = async (email) => {
  const leadResult = await Promise.all([
    Lead.updateMany(
      { corredor: email },
      {
        $set: {
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
        },
      }
    ),
    Lead.updateMany(
      { vendedor: email },
      {
        $set: {
          status: "Sin contactar",
          status_op: "",
          llamados: 0,
          vendedor: "",
          vendedor_name: "",
          checked: true,
          view: true,
          deleted: false,
        },
      }
    ),
  ]);

  return leadResult;
};

module.exports = cleanValueClevel;
