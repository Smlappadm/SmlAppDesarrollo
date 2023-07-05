const Lead = require("../../models/Lead");

// const postFreelancer = async ({
//   name,
//   email,
//   birthdate,
//   photo,
//   country,
//   contactNumber,
//   description,
//   rol,
//   deleted,
// }) => {

//   let leadQuery = {};

//   if (name) {
//     leadQuery["name"] = body.email;
//   }
//   if (email) {
//     leadQuery["email"] = body.email;
//   }
//   if (birthdate) {
//     leadQuery["birthdate"] = body.email;
//   }
//   if (photo) {
//     leadQuery["photo"] = body.email;
//   }
//   if (country) {
//     leadQuery["country"] = body.email;
//   }
//   if (contactNumber) {
//     leadQuery["contactNumber"] = body.email;
//   }
//   if (rol) {
//     leadQuery["rol"] = body.email;
//   }
//   if (description) {
//     leadQuery["description"] = body.email;
//   }
//   if (deleted) {
//     leadQuery["deleted"] = body.email;
//   }



//   const freelancer = await Freelancer.create({leadQuery});
//   return freelancer;
// };

// module.exports = postFreelancer;


// const Lead = require("../../models/Lead");

const getLeadChecked = async (body) => {

//   await Lead.updateMany(
//     { vendedor: body.email, status: "Sin contactar" },
//     {
//       $set: {
//         status_op: "",
//         llamados: 0,
//         vendedor: "",
//         vendedor_name: "",
//         checked: true,
//         view: true,
//         deleted: false,
//       },
//     }
//   );

console.log("asdfasdfasdf")
console.log(body)



  //BUSCA LOS QUE TENGA MI MAIL
//   let leadQuery = {
//     checked: true,
//     status: "Sin contactar",
//     level: { $nin: ["incidencia", "0", "", "-"] },
//   };

//   if (body.email) {
//     leadQuery["email"] = body.email;
//   }
//   if (body.country) {
//     leadQuery["country"] = body.country;
//   }
//   if (body.profesion) {
//     leadQuery["profesion"] = body.profesion;
//   }

//   const leadChequedInactive = await Lead.find(leadQuery).limit(5).exec();

//   BUSCA LOS NO RESPONDE --------------------------
//   const leadChequedInactiveNoResponde = await Lead.find({
//     checked: true,
//     vendedor: body.email,
//     status: "No responde",
//     level: { $nin: ["incidencia", "0", "", "-"] },
//   });

//   const leadsNoRespondenSorted = leadChequedInactiveNoResponde.sort((a, b) => {
//     const dateA = a.updatedAt.toISOString();
//     const dateB = b.updatedAt.toISOString();

//     if (dateA.slice(0, 4) !== dateB.slice(0, 4)) {
//       return dateA.slice(0, 4) - dateB.slice(0, 4);
//     }

//     if (dateA.slice(5, 7) !== dateB.slice(5, 7)) {
//       return dateA.slice(5, 7) - dateB.slice(5, 7);
//     }

//     if (dateA.slice(8, 10) !== dateB.slice(8, 10)) {
//       return dateA.slice(8, 10) - dateB.slice(8, 10);
//     }

//     if (dateA.slice(11, 13) !== dateB.slice(11, 13)) {
//       return dateA.slice(11, 13) - dateB.slice(11, 13);
//     }

//     if (dateA.slice(14, 16) !== dateB.slice(14, 16)) {
//       return dateA.slice(14, 16) - dateB.slice(14, 16);
//     }

//     return 0;
//   });
//   --------------------------------------------------

//   leadQuery = {
//     vendedor: "",
//     checked: true,
//     status: "Sin contactar",
//     level: { $nin: ["incidencia", "0", "", "-", "1"] },
//   };
//   if (body.country) {
//     leadQuery["country"] = body.country;
//   }
//   if (body.profesion) {
//     leadQuery["profesion"] = body.profesion;
//   }
  
//   let count = 0;
//   count = 5 - leadChequedInactive.length;
//   let leadRest = [];
//   let leadRestNivel2 = [];
//   let leadRestNivel1 = [];

  
//   if (count) {
//     if (count > 0 && count <= 5) {
//       leadRestNivel2 = await Lead.find(leadQuery)
//       .limit(count)
//       .exec();
      
//       let count2 = 0;
//       count2 = count - leadRestNivel2.length;
//       leadQuery = {
//         vendedor: "",
//         checked: true,
//         status: "Sin contactar",
//         level: { $nin: ["incidencia", "0", "", "-", "2"] },
//       };
//       if (body.country) {
//         leadQuery["country"] = body.country;
//       }
//       if (body.profesion) {
//         leadQuery["profesion"] = body.profesion;
//       }
//       if (count2) {
//         if (count2 > 0 && count2 <= 5) {
//           leadRestNivel1 = await Lead.find(leadQuery)
//             .limit(count2)
//             .exec();
//         }
//       }

//       leadRest = [...leadRestNivel2, ...leadRestNivel1];

//       if (leadRest.length > 0) {
//         await Promise.all(
//           leadRest.map(async (element) => {
//             element.vendedor = body.email;
//             element.vendedor_name = body.name;
//             await element.save();
//           })
//         );
//       }
//     }
//   }

//   return [...leadChequedInactive, ...leadRest, ...leadsNoRespondenSorted];

};

module.exports = getLeadChecked;
