const Promociones = require("../../models/Promociones");

const updatePromocionById = async (id, body) => {
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
        "promocion.descuento": body.descuento,
        "promocion.active": body.active,
        "promocion.edicion": body.edicion,
      },
    },
    { new: true }
  );

  return promociones;
};

module.exports = updatePromocionById;
