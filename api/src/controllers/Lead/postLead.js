const Lead = require("../../models/Lead");

const postLead = async (data) => {
  const client = await data.map(
    ({
      city,
      province,
      name,
      category,
      email,
      telephone,
      url,
      country,
      profesion,
      marca_personal,
      description,
      speech,
      monto_op,
      fecha_op,
      checked,
      view,
      corredor,
      vendedor,
      level,
      instagram,
      status,
      vendedor_id,
      corredor_id,
    }) => {
      const lead = Lead.create({
        name: name,
        category: category,
        city: city,
        province: province,
        url: url ? url : "-",
        telephone: telephone ? telephone : "-",
        email: email ? email : "",
        instagram: instagram ? instagram : "",
        level: level ? level : "-",
        status: status ? status : "Sin contactar",
        statusoptions: "",
        vendedor_id: vendedor_id ? vendedor_id : "",
        corredor_id: corredor_id ? corredor_id : "",
        checked: checked ? checked : false,
        view: view ? view : false,
        country: country,
        profesion: profesion,
        marca_personal: marca_personal,
        description: description ? description : "",
        speech: speech ? speech : "",
        monto_op: monto_op ? monto_op : 0,
        fecha_op: fecha_op ? fecha_op : "",
        corredor: corredor ? corredor : "",
        vendedor: vendedor ? vendedor : "",
        deleted: false,
      });
      return lead;
    }
  );
  return client;
};

module.exports = postLead;
