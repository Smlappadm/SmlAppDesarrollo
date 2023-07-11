const Lead = require("../../models/Lead");

const findLeadVendedorNameAllInfo = async (
  email,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status
) => {
  const regexVendedor = email ? new RegExp(email, "i") : /.*/;
  const query = {
    vendedor: regexVendedor,
    checked: true,
    view: true,
    freelancer: { $ne: true },
  };

  if (fromDay && toDay) {
    const [fromYear, fromMonth, fromDayOfMonth] = fromDay.split("-");
    const [toYear, toMonth, toDayOfMonth] = toDay.split("-");

    const startDate = new Date(
      parseInt(fromYear),
      parseInt(fromMonth) - 1,
      parseInt(fromDayOfMonth),
      0,
      0,
      0
    );
    const endDate = new Date(
      parseInt(toYear),
      parseInt(toMonth) - 1,
      parseInt(toDayOfMonth),
      23,
      59,
      59
    );
    query.updateVendedor = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  if (profesion) {
    query.profesion = profesion;
  }

  if (country) {
    query.country = country;
  }

  if (category) {
    query.category = category;
  }

  if (level) {
    query.level = level;
  }

  if (status) {
    if (status !== "Sin contactar") {
      query.status = status;
    }
  } else {
    query.status = { $ne: "Sin contactar" };
  }

  const leads = await Lead.find(query).exec();
  return leads;
};

module.exports = findLeadVendedorNameAllInfo;
