
//Middle ware file using JSON Web Token for authentication 
const jwt = require('jsonwebtoken');
const config = require('../config/config');

let verificarAuth = function (req, res, next) {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.SECRET_TOKEN, function (err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: 'Token inválido'
        });
      } else {

        req.decoded = decoded;
        next();

      }
    });

  } else {
    res.status(403).json({
      success: false,
      message: 'No estas autentificado con ningún token'
    });

  }
}
let verificaRol = function (req, res, next) {
  let rol = req.decoded.user.is_Admin;

  //console.log(rol);

  if(rol !== true){
    return res.status(401).json({
      mensaje: '¡Rol no autorizado para acceder a esta ruta!'
    })
  }
  next();
}

module.exports = { verificarAuth, verificaRol };