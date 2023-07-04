require("dotenv").config();

const mongoose = require("mongoose");

// const { URI } = ;
// const DB_URI = URI;

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("********* CONEXIÓN CORRECTA *******");
  })
  .catch((err) => {
    console.log("********* ERROR DE CONEXIÓN *******");
    console.error(err);
  });
