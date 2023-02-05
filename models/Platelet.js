const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
// Schema Design
const plateletSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Provide Your Name'],
        trim:true,
    },
    plateletDistrict:{
        type:String,
        required:true,
        trim:true,
    },
    plateletAddress:{
        type:String,
        required:true,
        trim:true,
    },
    permanentDistrict:{
        type:String,
        required:true,
        trim:true,
    },
    permanentAddress:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
    },
    mobileNumber:{
        type:String,
        trim:true,
    },
    bloodGroup:{
        type:String,
        trim:true,
    },
    lastBloodDay:{
        type:String,
        trim:true,
    },
    lastBloodMonth:{
        type:String,
        trim:true,
    },
    lastBloodYear:{
        type:String,
        trim:true,
    },
    gender:{
        type:String,
        trim:true,
    },
    dateOfBirth:{
        type:String,
        trim:true,
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