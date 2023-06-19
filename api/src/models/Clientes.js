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
    rol: {
      type: String,
      required: true,
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
