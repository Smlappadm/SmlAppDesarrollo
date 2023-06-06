const mongoose = require("mongoose");
const validator = require("validator");

const LeadSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    telephone: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    instagram: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      enum: ["", "-", "0", "1", "2", "incidencia"],
    },
    status: {
      type: String,
      enum: [
        "Sin contactar",
        "Rechazado",
        "Contratado",
        "No responde",
        "Agendar 2do llamado",
        "incidencia",
      ],
      require: true,
    },
    llamada_venta: {
      type: Object,
      require: true,
    },
    status_op: {
      type: String,
      require: true,
      default: "",
    },
    llamados: {
      type: Number,
      require: true,
      default: 0,
    },
    vendedor: {
      type: String,
      require: true,
      default: "",
    },
    vendedor_name: {
      type: String,
      require: true,
      default: "",
    },
    corredor: {
      type: String,
      require: true,
      default: "",
    },
    corredor_name: {
      type: String,
      require: true,
      default: "",
    },
    checked: {
      type: Boolean,
      require: true,
      default: false,
    },
    view: {
      type: Boolean,
      require: true,
      default: false,
    },
    country: {
      type: String,
      require: true,
    },
    profesion: {
      type: String,
      require: true,
    },
    marca_personal: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    speech: {
      type: String,
      require: true,
      default: "",
    },
    monto_op: {
      type: Number,
      require: true,
      default: 0,
    },
    fecha_op: {
      type: String,
      require: true,
      default: "",
    },
    deleted: {
      type: Boolean,
      require: true,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

LeadSchema.pre("find", function () {
  this.where({ deleted: false });
});

const Lead = new mongoose.model("lead", LeadSchema);

module.exports = Lead;
