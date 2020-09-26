const jwt = require('jsonwebtoken');
const fs = require('fs');
const Token = require('../models/tokens');
const CONFIG = require('../config/config'); //va servir para crear el jwt del excell
var Excel = require('exceljs');
const mkdirp = require('mkdirp');
const checkDirectorySync = (directory) => {
    try {
        fs.statSync(directory);
    } catch (e) {
        try {
            fs.mkdirSync(directory);
        } catch (err) {
            mkdirp.sync(directory); // error : directory & sub directories to be newly created
        }
    }
};
const delete_file = (directory) => {
    fs.unlinkSync(directory);
};

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
    /*res.json({
        success: true,
        message: 'Token agregado correctamente'
    });*/
    console.log("entro y se creo correctamente el token")
    req.body.token = token;
    return next();
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

exports.generateFile = (req, res) => {

    //esta funcion a través del next recibirá el id del usuario, para que se crea la carpeta en donde van a estar los tokens genereados  
    data = req.decoded;
    let token_data = req.body.token;
    var file_name = 'generic_token.xlsx';
    var file_name_dos = 'generic_token_copied.xlsx';
    var src = './app/files/generic/' + file_name;
    var dest = './app/files/tokens_generated/temp/' + file_name_dos;
    var dest_dos = './app/files/tokens_generated/tokens_users';
    const path = require('path');
    //var path = require('path');
    appRoot = path.resolve(__dirname);
    //var hostname = req.headers.host;

    console.log(token_data);
    //console.log(data.user);
    payload = {

        id: data.user._id,
        name: data.user.name,
        apellido_pat: data.user.apellido_pat,
        apellido_mat: data.user.apellido_mat,
        email: data.user.email,
        phone: data.user.phone,
        id_token: token_data._id

    }
    var token_dos = jwt.sign(
        payload, CONFIG.SECRET_TOKEN, {
            expiresIn: '7d'
        });
    //console.log(token);
    //fs.copyFile(src, appRoot.resolve(dest, file_name)
    //res.json({ message: 'file archived!' });
    //console.log('entro');

    fs.copyFile(src, dest, (err) => {
        if (err) {
            console.log("Error Found:", err);
        } else {
            var workbook = new Excel.Workbook();
            var filename = file_name_dos;
            workbook.xlsx.readFile(dest).then(function() {
                var worksheet = workbook.getWorksheet(1);
                var row_uno = worksheet.getRow(1500);
                var row_dos = worksheet.getRow(1501);
                var end_point = 'api_v1/tokens/token/alarmas'
                var token_generated = token_dos;
                row_uno.getCell(5).value = token_generated; // A5's value set to 5
                row_dos.getCell(5).value = end_point;
                row_uno.commit();
                row_dos.commit();
                const tokenPath = data.user._id.toString();
                const token_id_path = token_data._id.toString();
                const uploadDir = path.join(dest_dos, tokenPath);
                const dir_final = path.join(uploadDir, token_id_path);
                // Check directory and create (if needed)
                console.log(dir_final);
                console.log(token_id_path);
                checkDirectorySync(dir_final);

                // save the content in a new file (formulas re-calculated)
                workbook.xlsx.writeFile(dir_final + `/${token_data.nombre_token}.xlsx`);
                delete_file(dest);
            });


            // Get the current filenames 
            // after the function 
            //getCurrentFilenames();
            //res.json({ message: 'file archived!' });
        }
    });




    return res.status(200).send({ success: true, message: "Token creado correctamente" });

};