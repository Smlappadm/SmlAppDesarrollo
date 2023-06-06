const Lead = require("../../models/Lead");

const updateLeadById = async (id, updatedData) => {
  try {
    const lead = await Lead.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return lead;
  } catch (error) {
    throw new Error(`Error updating lead with id ${id}: ${error.message}`);
  }
};

module.exports = updateLeadById;
