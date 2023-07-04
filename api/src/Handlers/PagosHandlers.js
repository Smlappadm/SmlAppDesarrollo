const getAllLeaders = require("../controllers/Leader/getAllLeaders");



const updatePagosInfoHandler = async (req, res) => {
    console.log("entro a pagos")
//   const email = req.query.email;
//   const updatedData = req.body;

//   try {
//     const leader = await updateLeaderByEmail(email, updatedData);
//     res.status(200).json(leader);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
};

module.exports = {updatePagosInfoHandler}

