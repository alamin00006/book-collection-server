const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config();
exports.generateToken = (user) =>{
const payload = {
email:user.email,
role:user.role
}
const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'7days'
})
return token;
}