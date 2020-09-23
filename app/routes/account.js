//librerias
const router = require('express').Router();
const checkJWT = require('../middleware/check-auth');
const UserController = require('../controllers/User_Controller');
//rutas globales
router.post('/login', UserController.logIn);


//rutas usuarios administradores
router.post('/signup', UserController.signUp);//esta ruta sirve para crear los usuarios administradores, solo nosotros la usaremos porque a ellos se les dará una pass y username predefinidos, esta ruta esta comentada al menos que se tenga que crear un nuevo administrador

//ruta para crear subadministradores, esta rutas estan protegidas solo para los que tengan rol tipo usuario administrador
router.post('/register', [checkJWT.verificarAuth,checkJWT.verificaRol], UserController.registerUser);
//esta ruta obtiene todos la lista de subadministradores pertenecientes al administrador
router.get('/users', [checkJWT.verificarAuth,checkJWT.verificaRol], UserController.getAllUsers)
//falta el eliminado de usuarios, que hará el administrador, falta validar el rol administrador
router.delete('/users/:userId',[checkJWT.verificarAuth,checkJWT.verificaRol] , UserController.deleteUser) 
//actualizado de usuarios por id, igual solo el admin puede acceder a esto, falta validar el rol
router.patch('/users/:userId', [checkJWT.verificarAuth,checkJWT.verificaRol],  UserController.updateOneUser);



//rutas de subadministradores, estas son para actualizar o verificar tu perfil de usuario subadministrador, la cual puede ser eliminada con la ruta '/users/:userId' a la cual solo puede acceder al administrador, aqui no hay necesidad de validar el tipo de rol, solo validar que el token este activo o funcionando
router.get('/profile', checkJWT.verificarAuth, UserController.getProfile)
router.post('/profile', checkJWT.verificarAuth, UserController.updateProfile)



module.exports = router;