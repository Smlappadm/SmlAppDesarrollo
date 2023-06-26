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
    drive: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    seguidoresInstagram: {
      type: Number,
    },
    seguidoresTiktok: {
      type: Number,
    },
    seguidores: {
      type: Number,
    },
    seguidoresGanados: {
      type: Number,
    },
    videosPublicados: {
      type: Number,
    },
    videosPublicadosAnteriores: {
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

// Método estático para filtrar por seguidores desde siempre
ClienteSchema.statics.filterBySeguidoresDesdeSiempre = function () {
  return this.find({}).select("seguidoresGanados");
};

// Método estático para filtrar por seguidores hace 1 mes
ClienteSchema.statics.filterBySeguidoresHaceUnMes = function () {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return this.find({ createdAt: { $gte: oneMonthAgo } }).select(
    "seguidoresGanados"
  );
};

// Método estático para filtrar por seguidores hace 1 semana
ClienteSchema.statics.filterBySeguidoresHaceUnaSemana = function () {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return this.find({ createdAt: { $gte: oneWeekAgo } }).select(
    "seguidoresGanados"
  );
};

// Método estático para filtrar por seguidores del día actual
ClienteSchema.statics.filterBySeguidoresDelDia = function () {
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return this.find({ createdAt: { $gte: today, $lt: tomorrow } }).select(
    "seguidoresGanados"
  );
};

const Cliente = new mongoose.model("cliente", ClienteSchema);

module.exports = Cliente;
