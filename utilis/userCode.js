const jwt = require('jsonwebtoken')
require("dotenv").config();
exports.generateUserCode = (user) =>{
const payload = {
email:user.email,
role:user.role
}
const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'1d'
})
return token;
}