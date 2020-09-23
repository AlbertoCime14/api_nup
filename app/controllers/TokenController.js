const jwt = require('jsonwebtoken');
const Token = require('../models/tokens');
//const Order = require('../models/order');
const CONFIG = require('../config/config');


//falta validar la parte de que el token no este expirado

exports.createToken = (req, res, next) => {
    //console.log(upload);
    //console.log(req.file); tal vez me sirva para la lectura del archivo
    let token = new Token();
    token.propietario = req.decoded.user._id;
    token.nombre_token = req.body.nombre_token;
    token.nota_recordatoria = req.body.nota_recordatoria;
    token.disponible = req.body.disponible;
    token.save();
    res.json({
      success: true,
      message: 'Token agregado correctamente'
    });
};

exports.getTokens = (req, res, next) => {
    Token.find({ propietario: req.decoded.user._id })
      .populate('propietario')
      .exec((err, tokens) => {
        if (tokens) {
          res.json({
            success: true,
            message: "Lista de tokens",
            tokens: tokens
          });
        }
      });
};

exports.deleteToken = (req, res, next) => {
    const tokenId = req.params.id_token;
	Token
		.remove({ _id: tokenId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Token eliminado correctamente',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};


