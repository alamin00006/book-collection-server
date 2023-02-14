require("dotenv").config();
const User = require('../models/User');
const { generateToken } = require('../utilis/token');
// const nodemailer = require('nodemailer');
// var sgTransport = require('nodemailer-sendgrid-transport');


// const options = {
//     auth: {
//       api_key: process.env.EMAIL_SENDER_KEY
//      }
//   }
// let mailer = nodemailer.createTransport(sgTransport(options))

// function sendBookingEmail() {
  
//     const email = {
//         to: 'alaminbamna08@gmail.com',
//         from: 'mohammadalamin1090@gmail.com',
//         subject: 'Hi there',
//         text: 'Awesome sauce',
//         html: '<b>Awesome sauce</b>'
//     };
     
//     mailer.sendMail(email, function(err, res) {
//         if (err) { 
//             console.log('amar error'+err) 
//         }
//         console.log('res data ' + res.response);
//     });
// }





exports.createUser = async (req, res) =>{

    try{
    const email = req.body.email;
    const user = await User.findOne({email})
    if(user){
        return res.status(401).json({
            status:'fail',
            message:'Sorry This Email Already Exist'
        })
    }
     const result = await User.create(req.body)

     res.status(200).json({
         status:'success',
         message:'Successfully Signed Up',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'user not Added',
         error:error.message
     })
    }
 }
exports.createLogin = async (req, res) =>{
//    console.log(req.body)
    try{
    const {email, password} = req.body;
    if(!email ||!password){
        return res.status(401).json({
            status:'fail',
            message:'please provide email and password'
        })
    }

     const user = await User.findOne({email})
  
     if(!user){
        return res.status(401).json({
            status:'fail',
            message:'Sorry No user Found, Please create an account'
        })
    }

    const isValidPassword = user.comparePassword(password,user.password)
    if(!isValidPassword){
        return res.status(403).json({
            status:'fail',
            message:'Wrong email or password'
        })
    }
    const token = generateToken(user);
    const {password:pwd, ...others} = user.toObject();

     res.status(200).json({
         status:'success',
         message:'Successfully Logged in',
         data:{
            user:others,
            token
         }
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'user not Added',
         error:error.message
     })
    }
 }

exports.getMe = async (req, res) =>{

    try{
    const email =  req?.user?.email
     const user = await User.findOne({email})
     const {password:pwd, ...others} = user?.toObject();
     res.status(200).json({
         status:'success',
         data:others
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Please Log in',
         error:error.message
     })
    }
 }
exports.allUser = async (req, res) =>{

    try{
    // const email =  req?.user?.email
     const user = await User.find({})
    //  const {password:pwd2, ...others} = user?.toObject();
     res.status(200).json({
         status:'success',
         data:user
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'no user found',
         error:error.message
     })
    }
 }
