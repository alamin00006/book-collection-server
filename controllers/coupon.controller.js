const Coupon = require('../models/Coupon');

exports.createCoupon = async (req, res) =>{

    try{
     const coupon = new Coupon(req.body)
     const result = await coupon.save()

     res.status(200).json({
         status:'success',
         message:'Coupon Added Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Coupon not Added',
         error:error.message
     })
    }
 }

 exports.getCoupon = async (req,res)=>{
    try{
       const coupons = await Coupon.find({})
      //  const categories = await Category.find({}).populate('products')
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'coupon get Success',
        data:categories
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'coupon not found',
        error:error.message
      })
    }
}
