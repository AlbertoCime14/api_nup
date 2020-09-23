//librerias
const router = require('express').Router();
const checkJWT = require('../middleware/check-auth');
const UserController = require('../controllers/user');
//rutas globales
router.post('/login', UserController.logIn);


//rutas usuarios administradores
router.post('/signup', UserController.signUp);//esta ruta sirve para crear los usuarios administradores, solo nosotros la usaremosl porque a ellos se les dará una pass y username predefinidos, esta ruta esta comentada al menos que se tenga que crear un nuevo administrador
//ruta para crear subadministradores
router.post('/register', checkJWT, UserController.registerUser);
//esta ruta obtiene todos la lista de subadministradores pertenecientes al administrador
router.get('/users', checkJWT, UserController.getAllUsers)
//falta el eliminado de usuarios, que hará el administrador, falta validar el rol administrador
router.delete('/users/:userId', checkJWT, UserController.deleteUser) 
//actualizado de usuarios por id, igual solo el admin puede acceder a esto, falta validar el rol
router.patch('/users/:userId', checkJWT,  UserController.updateOneUser);



//rutas de subadministradores
router.get('/profile', checkJWT, UserController.getProfile)
router.post('/profile', checkJWT, UserController.updateProfile)



module.exports = router;