//librerias
const router = require('express').Router();
const checkJWT = require('../middleware/check-auth');
const UserController = require('../controllers/user');

//rutas usuarios
router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);
router.get('/profile', checkJWT, UserController.getProfile)
router.post('/profile', checkJWT, UserController.updateProfile)

//esta es la parte que tendra el administrador principal, hay que validar que solo el admin pueda acceder a esta ruta, sin embargo esto lo validamos después
router.get('/users', checkJWT, UserController.getAllUsers)
//falta el eliminado de usuarios, que hará el administrador, igual falta validar esta parte
router.delete('/users/:userId', checkJWT, UserController.deleteUser) 
//actualizado de usuarios por id, igual solo el admin puede acceder a esto
router.patch('/users/:userId', checkJWT,  UserController.updateOneUser);
module.exports = router;