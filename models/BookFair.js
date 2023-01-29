const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const bookFairSchema = mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    bookFairYear:{
        type:String,
        required: true,
        trim: true,
        unique:true
    }
},
{
    timestamps:true
})

const BookFair = mongoose.model('BookFair', bookFairSchema);
module.exports = BookFair;