const Promociones = require("../../models/Promociones");

const updatePromocionById = async (id, body) => {
  console.log("ACA HAGO EL PUT");
  console.log(id);
  console.log(body);

  const promociones = await Promociones.findByIdAndUpdate(
    id,
    {
      $set: {
        "promocion.name": body.name,
        "promocion.hora": body.hora,
        "promocion.link": body.link,
        "promocion.cuota": body.cuota,
        "promocion.monto": body.monto,
        "promocion.valorCuota": body.valorCuota,
        "promocion.active": body.active,
      },
    },
    { new: true }
  );

  return promociones;
};

module.exports = updatePromocionById;
