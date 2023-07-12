const Lead = require("../../models/Lead");


const changeLeadEmail = async (id , key, value) => {
  console.log("entroooooooo")
  console.log(key)
  console.log(value)
    if(key === "emailApp"){
      const leadsearch = await Lead.updateMany(
        { emailApp: value},
        {
          $set: {
            emailApp: "",
          },
        }
      )

      console.log(leadsearch)
    }

    const lead = await Lead.findOneAndUpdate(
        { _id: id },
        { [key]: value },
        { new: true }
      );
    return lead;

};

module.exports = changeLeadEmail;
