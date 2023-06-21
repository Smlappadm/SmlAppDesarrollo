const validation = (pago) => {
    const errors = {};
  
    if(pago.nombre[0] === " " || !pago.nombre) errors.nombre = "";
    else if (pago.email) errors.email = "";
    if(pago.email2 === '') errors.email2 = "";
    else if(pago.pais) errors.pais = "";
    else if(pago.calle) errors.calle = "";
    else if(pago.numero) errors.numero = "";  
    if(!pago.cp) errors.cp = "";
    if(pago.tarjeta) errors.tarjeta = "";
  

    
    return errors;
  };
  
  export default validation;
  