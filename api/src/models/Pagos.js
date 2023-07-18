const mongoose = require("mongoose");


const PagosSchema = new mongoose.Schema(
  {
    info: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);


const Pagos = new mongoose.model("pagos", PagosSchema);

module.exports = Pagos;



promosion{
  promosion1: { 
    horas, 
    activo,
    pagos: {{cuota:"", valor:"", link1:""}, {cuota, valor, link2}, {cuota, valor, link3}, {cuota, valor, link4}}
  }
}