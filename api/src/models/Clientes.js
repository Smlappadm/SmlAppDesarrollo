const mongoose = require("mongoose");
const validator = require("validator");

const ClienteSchema = new mongoose.Schema(
  {
    name: {
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
      select: false,
    },
  },
  { timestamps: true }
);

ClienteSchema.pre("find", function () {
  this.where({ deleted: false });
});

const Cliente = new mongoose.model("cliente", ClienteSchema);

module.exports = Cliente;
