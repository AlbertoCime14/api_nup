const jwt = require('jsonwebtoken');
const User = require('../models/user');
//const Order = require('../models/order');
const CONFIG = require('../config/config');


exports.signUp = (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.apellido_pat = req.body.apellido_pat;
  user.apellido_mat = req.body.apellido_mat;
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.avatar = user.gravatar();
  user.is_Admin = req.body.is_Admin;
  user.phone = req.body.phone;


  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
      res.json({
        success: false,
        message: 'Usuario registrado con ese email'
      });

    } else {
      user.save();

      var token = jwt.sign({
        user: user
      }, CONFIG.SECRET_TOKEN, {
        expiresIn: '7d'
      });

      res.json({
        success: true,
        message: 'Registro con éxito',
        token: token
      });
    }

  });
};

exports.logIn = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authenticated failed, User not found'
      });
    } else if (user) {

      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password'
        });
      } else {
        var token = jwt.sign({
          user: user
        }, CONFIG.SECRET_TOKEN, {
          expiresIn: '7d'
        });

        res.json({
          success: true,
          mesage: "Inicio de sesion correcto",
          token: token
        });
      }
    }

  });
};
exports.getProfile = (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    res.json({
      success: true,
      user: user,
      message: "Successful"
    });
  });
};
exports.updateProfile = (req, res, next) => {
  User.findOne({ _id: req.decoded.user._id }, (err, user) => {
    if (err) return next(err);

    if (req.body.name) user.name = req.body.name;
    if (req.body.apellido_pat) user.apellido_pat = req.body.apellido_pat;
    if (req.body.apellido_mat) user.apellido_mat = req.body.apellido_mat;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.avatar) user.avatar = req.body.avatar;
    if (req.body.phone) user.phone = req.body.phone;
    user.is_Admin = req.body.is_Admin;

    user.save();
    res.json({
      success: true,
      message: 'Perfil actualizado con éxito'
    });
  });
};

exports.getAllUsers = (req, res, next) => {
  User
    .find()
    // .select('_id name price')
    .exec()
    .then(users => {
      const response = {
        count: users.length,
        users: users.map(user => {
          return {
            _id: user._id,
            name: user.name,
            apellido_pat: user.apellido_pat,
            apellido_mat: user.apellido_mat,
            email: user.price,
            avatar: user.avatar,
            phone: user.phone
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(error => {
      next(error);
    })
};

exports.updateOneUser = (req, res, next) => {
	const userId = req.params.userId;
	// const updateOps = {};
	// for (const prop of req.body) {
	// 	updateOps[prop.propName] = prop.propValue;
	// }

	User
		.update({ _id: userId }, { $set: req.body })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Usuario actualizado correctamente',
				result: result
			});
		})
		.catch(error => {
			next(error);
		})
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
	User
		.remove({ _id: userId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Usuario eliminado correctamente',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};
