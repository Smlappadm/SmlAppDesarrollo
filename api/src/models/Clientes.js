const mongoose = require("mongoose");
const validator = require("validator");

const ClienteSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
    },
    seguidoresinstagram: {
      type: String,
    },
    drive: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    seguidorestiktok: {
      type: String,
    },
    videosPublicados: {
      type: Number,
    },
    videosPublicadosAnteriores: {
      type: Number,
    },
    seguidoresGanados: {
      type: Number,
    },
    seguidoresGanadosAnteriores: {
      type: Number,
    },
    videosAcumulados: {
      type: Number,
    },
    videosAcumuladosAnteriores: {
      type: Number,
    },
    meGustaAcumulados: {
      type: Number,
    },
    meGustaAcumuladosAnteriores: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "El correo electrónico debe tener un formato válido",
      },
    },
    photo: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },

    rol: {
      type: String,
      required: true,
    },
    referred: {
      type: Array,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Cliente = new mongoose.model("cliente", ClienteSchema);

module.exports = Cliente;
