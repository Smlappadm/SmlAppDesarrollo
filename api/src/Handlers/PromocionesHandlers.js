const getAllPromociones = require("../controllers/Promociones/getAllPromociones");
const postPromociones = require("../controllers/Promociones/postPromociones");

// Obtener todos las promociones
const getAllPromocionesHandler = async (req, res) => {
  try {
    const promociones = await getAllPromociones();
    res.status(200).json(promociones);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nueva promoción
const postPromocionesHandler = async (req, res) => {
    const body = req.body
    console.log(body);
  try {
    const promociones = await postPromociones(body);
    res.status(200).json(promociones);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllPromocionesHandler,
  postPromocionesHandler,
};
