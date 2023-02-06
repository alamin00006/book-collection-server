const mongoose = require("mongoose");
// Schema Design
const plateletSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Provide Your Name'],
    },
    plateletDistrict:{
        type:String,
        required:true,
    },
    plateletAddress:{
        type:String,
        required:true,
    },
    permanentDistrict:{
        type:String,
        required:true,
    },
    permanentAddress:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    mobileNumber:{
        type:String,
    },
    bloodGroup:{
        type:String,
    },
    lastBloodDay:{
        type:String,
    },
    lastBloodMonth:{
        type:String,
    },
    lastBloodYear:{
        type:String,
    },
    gender:{
        type:String,
        enum:{
            values:['male', 'female'],
            }
    },
    dateOfBirth:{
        type:String,
    },
    password:{
        type:String,
        trim:true,
    },
    confirmPassword:{
        type:String,
        trim:true,
    },

},
{
    timestamps:true
})



const Platelet = mongoose.model('Platelet', plateletSchema);

module.exports = Platelet;