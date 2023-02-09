const User = require('../models/User');
const { generateToken } = require('../utilis/token');

exports.createUser = async (req, res) =>{

    try{
    //  const user = new User(req.body)
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
   console.log(req.body)
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
            message:'No user Found, Please create an account'
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

     res.status(200).json({
         status:'success',
         data:user
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Please Log in',
         error:error.message
     })
    }
 }
