const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const writerSchema = mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    name:{
        type:String,
        required: [true, 'Please Provide Writer Name'],
        trim: true,
        unique:true
    }
},
{
    timestamps:true
})

const Writer = mongoose.model('Writer', writerSchema);
module.exports = Writer;