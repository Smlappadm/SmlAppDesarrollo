const mongoose = require("mongoose");


const PagosSchema = new mongoose.Schema(
  {
    informacion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Pagos = new mongoose.model("pagos", PagosSchema);

module.exports = Pagos;
