const Lead = require("../../models/Lead");


const changeLeadEmail = async (id , key, value) => {
    if(key === "emailApp"){
      const leadsearch = await Lead.updateMany(
        { emailApp: value},
        {
          $set: {
            emailApp: "",
          },
        }
      )

    }

    const lead = await Lead.findOneAndUpdate(
        { _id: id },
        { [key]: value },
        { new: true }
      );
    return lead;

};

module.exports = changeLeadEmail;
