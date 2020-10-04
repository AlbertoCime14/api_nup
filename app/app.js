const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan'); //Morgan is used for logging request details
var cors = require('cors'); //Package to connect middle-ware or cross-platform applications
const path = require('path');

const app = express(); //wrapping the new express application in app variable 
//const App= express();
app.use(express.static(path.join(__dirname, 'files')));

//const Token= require('./routes/token')
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use('/token', Token )

//express application using required packages 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

const userRoutes = require('./routes/account');
const tokensRoutes = require('./routes/token');


//express application using Routes from this application
//rutas para el usuario
app.use('/api_v1/accounts', userRoutes);
//rutas para los tokens
app.use('/api_v1/tokens', tokensRoutes);


module.exports = app;