const Lead = require("../../models/Lead");



const changeLeadEmail = async (id , key, value) => {

    const lead = await Lead.findOneAndUpdate(
        { _id: id },
        { [key]: value },
        { new: true }
      );
    return lead;

};

module.exports = changeLeadEmail;
