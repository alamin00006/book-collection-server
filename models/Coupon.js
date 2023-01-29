const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    couponCode:{
      type:String,
      required:true,
      trim: true,
      unique:true
    },
    discountPercent:{
        type:Number,
        required:true,
        trim: true,
        unique:true
    }
},
{
    timestamps:true
})

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;