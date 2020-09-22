//librerias
const express = require('express');
const TokenController = require('../controllers/TokenController');
const router = express.Router();
const checkJWT = require('../middleware/check-auth');

//rutas usadas

router.get('/token', checkJWT, TokenController.getTokens);
router.post('/token', checkJWT, TokenController.createToken);
router.delete('/token/:id_token', checkJWT, TokenController.deleteToken);
//no se tendrá una ruta de actualizacion, una vez creado el token no se podrá actualizar, porque se tendría que generar uno nuevo





module.exports = router;

   
