const mongoose = require("mongoose");

const PromocionesSchema = new mongoose.Schema(
  {
    promosion: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Promociones = new mongoose.model("promociones", PromocionesSchema);

module.exports = Promociones;
