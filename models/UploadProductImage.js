const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema.Types;

const uploadProductSchema = mongoose.Schema({
  image:{
    type:String,
    required:true
  }
}
)

const UploadProductImage = mongoose.model('UploadProductImage', uploadProductSchema);
module.exports = UploadProductImage;