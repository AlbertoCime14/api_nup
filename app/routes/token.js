//librerias
const express = require('express');
const TokenController = require('../controllers/TokenController');
const router = express.Router();
const checkJWT = require('../middleware/check-auth');

//rutas usadas

router.get('/token', checkJWT.verificarAuth, TokenController.getTokens); //falta el list que borre
router.post('/token', checkJWT.verificarAuth, TokenController.createToken, TokenController.generateFile);
router.delete('/token/:id_token', checkJWT.verificarAuth, TokenController.deleteToken);
//no se tendrá una ruta de actualizacion, una vez creado el token no se podrá actualizar, porque se tendría que generar uno nuevo, porque se van a crear fisicamente en una carpeta
router.get("/download/:id_token/:name_file", checkJWT.verificarAuth, TokenController.getTokenFile);


//alarmas//
router.post("/token/alarma", checkJWT.verificarAuth, TokenController.createAlarma, TokenController.generateAlarma);
module.exports = router;