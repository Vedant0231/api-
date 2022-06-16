
var createError = require('http-errors');
const express = require('express');

const path = require('path');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const {check, validationResult} = require('express-validator');

var app = express();
const cors = require('cors');

// app.use(cors({
//     origin: '*',
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http//localhost:3000");
    res.setHeader("Access-Control-Allow-Headers","Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method" );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
    });


    
var indexRouter = require('./routes/index');
var api = require('./routes/api');






const urlencodedParser = bodyParser.urlencoded({extended:false})



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, 'public')));








app.use('/', indexRouter);
app.use('/', api);

module.exports = app;
