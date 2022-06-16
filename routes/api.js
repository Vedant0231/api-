const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
// const flash = require('connect-flash');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const { count } = require('console');
const bcrypt = require('bcrypt');
const { CLIENT_RENEG_LIMIT } = require('tls');
const saltRounds = 10;
// const uploadImage = require('../helpers/helpers');
const { json } = require('body-parser');

// const app = require('../app');
var app = express();
const router = express.Router();
//const admincontroller=require("../Controller/admin");
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


var storage = multer.diskStorage({
// var storage = multer.memoryStorage({
destination: function (req, file, cb) {
  cb(null, './uploads')
},
filename: function (req, file, cb) {
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}
})

var upload = multer({ storage: storage })
// router.use(flash());
router.use(cookieParser());
router.use('/uploads', express.static('uploads'));

// const mysqlconnection=require("../connection");
// router.use('/', admin);
router.use(sessions({
secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
saveUninitialized: true,
cookie: { maxAge: 120000 },
resave: false
}));


const con = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "",
  database: "mydemo",
  multipleStatements: true
});

router.post('/adduser',function (req,res){
  const name=req.body.name;
  const email=req.body.email;
  const phone=req.body.phone;
  const message=req.body.message;
  // const firstname=req.body.firstname;
  // const lastname=req.body.lastname;
  // const email =req.body.email;
  // const address=req.body.address;
  // const mobile_no=req.body.mobile_no;
  // const password =req.body.password;


    // const details= req.body.details;
    const insertQuery = "INSERT INTO project1 (username,email,mobile_num,message) VALUES ? ";
    // const insertQuery = "INSERT INTO vaibhav (firstname,lastname,email,address,mobile_no,password) VALUES ? ";
    // const values =[[firstname,lastname,email,address,mobile_no,password]];
    const values =[[name,email,phone,message]];
    console.log("Insert"+insertQuery);
    console.log("Data",+values);
    con.query(insertQuery,[values],(err,results,fields)=>{
      if(err){
        const category={
                        status:false,
                        data:[],
                        message:"Data Note Inserted Some Error Occured"+err
                      }
                      res.writeHead(200,{"Content-Type":"application/json"});
                          res.end(JSON.stringify(category));
      }
      const category={
                  status:true,
                  data:results,
                  message:"user Inserted Successfully"
                }
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify(category));    
    })
  
  });

  router.post('/email',function (req,res){
  var e = req.body.email;
  var transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"vedant.chaudhari.777@gmail.com",
        pass:""
    }
    
});

var mailOptions={
    from:"vedant.chaudhari.777@gmail.com",
    to:e.toString(),
    subject:"testing",
    text:"hello user your data has been enter"
}

transporter.sendMail(mailOptions,function(error,info){
  if(error){
    const category={
                    status:false,
                    data:[],
                    message:"email Not sended Some Error Occured"+error
                  }
                   res.writeHead(200,{"Content-Type":"application/json"});
                      res.end(JSON.stringify(category));
  }
  const category={
              status:true,
              data:info,
              message:"email send Successfully"
            }
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify(category));

});
});
  
module.exports=router; 