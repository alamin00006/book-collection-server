const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const publicationSchema = mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    name:{
        type:String,
        required: [true, 'Please Provide Publication Name'],
        trim: true,
        unique:true
    }
},
{
    timestamps:true
})

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;