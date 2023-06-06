 
const jwt = require("jsonwebtoken")

 const veryfyToken= (req, res, next)=>{
    const authHeader= req.headers["authorization"];
    const token= authHeader && authHeader.split(" ")[1];
    console.log(authHeader);
    if (token=== null) {
      return res.status(400).send("token requerido");
    }
    jwt.verify(token, TOKEN_KEY, (err, user)=>{
      console.log(user);
      req.user = user;
      next();
    })
  }

  module.exports= {veryfyToken}