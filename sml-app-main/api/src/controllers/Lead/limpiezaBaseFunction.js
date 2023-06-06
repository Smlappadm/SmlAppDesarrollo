const Lead = require("../../models/Lead");

const limpiezaBaseFunction = async () => {
  const leadResult = await Lead.updateMany(
    // { corredor: "email" },
    // {
    //   $set: {
    //     level: "",
    //     status: "Sin contactar",
    //     status_op: "",
    //     llamados: 0,
    //     vendedor: "",
    //     vendedor_name: "",
    //     corredor: "",
    //     corredor_name: "",
    //     checked: false,
    //     view: false,
    //     deleted: false,
    //     instagram: "",
    //   },
    // }
    // { vendedor: "undefined" },
    // {
    //   $set: {
    //     // level: "",
    //     status: "Sin contactar",
    //     status_op: "",
    //     llamados: 0,
    //     vendedor: "",
    //     vendedor_name: "",
    //     // corredor: "",
    //     // corredor_name: "",
    //     checked: true,
    //     view: true,
    //     deleted: false,
    //     // instagram: ""
    //   },
    // }

    // { corredor: 'email' },
    // {
    //   $set: {
    //     level: "",
    //     status: "Sin contactar",
    //     status_op: "",
    //     llamados: 0,
    //     vendedor: "",
    //     vendedor_name: "",
    //     corredor: "",
    //     corredor_name: "",
    //     checked: false,
    //     view: false,
    //     deleted: false,
    //     instagram: ""
    //   },
    // }

    //     { level: "" },
    //     {
    //       $set: {
    //         level: "",
    //         status: "Sin contactar",
    //         status_op: "",
    //         llamados: 0,
    //         vendedor: "",
    //         vendedor_name: "",
    //         corredor: "",
    //         corredor_name: "",
    //         checked: false,
    //         view: false,
    //         deleted: false,
    //         instagram: ""
    //       },
    //     }
  );
  return leadResult;
};

module.exports = limpiezaBaseFunction;
