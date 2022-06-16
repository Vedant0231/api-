const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const mysql = require('mysql');
const flash = require('connect-flash');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const fs = require('fs');
const { count } = require('console');
const bcrypt = require('bcrypt');
// const token = require('token');
const saltRounds = 10;



const router = express.Router();

router.use(flash());
router.use(cookieParser());
router.use('/uploads', express.static('uploads'));


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'public')));


router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
