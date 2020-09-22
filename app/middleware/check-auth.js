
//Middle ware file using JSON Web Token for authentication 
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function(req, res, next) {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.SECRET_TOKEN, function(err, decoded) {
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
