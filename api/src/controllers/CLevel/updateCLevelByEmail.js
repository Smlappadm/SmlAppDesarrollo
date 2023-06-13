const CLevel = require("../../models/CLevel");

const updateCLevelByEmail = async (email, updatedData) => {
  const clevel = await CLevel.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return clevel;
};

module.exports = updateCLevelByEmail;
