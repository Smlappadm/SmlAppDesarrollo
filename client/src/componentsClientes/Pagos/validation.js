const validation = (pago) => {
    const errores = {};

    const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(pago.nombre[0] === " " || !pago.nombre) errores.nombre = "hoal "
    else if (!regexEmail.test(pago.email)) errores.email = ">> email: Debe que ser un email";
  // if (pago.email) errores.email = "";
    // if(pago.email2 === '') errores.email2 = "";
    // else if(pago.pais) errores.pais = "";
    // else if(pago.calle) errores.calle = "";
    // else if(pago.numero) errores.numero = "";  
    // if(!pago.cp) errores.cp = "";
    // if(pago.tarjeta) errores.tarjeta = "";
  

    
    return errores;
  };
  
  export default validation;
  