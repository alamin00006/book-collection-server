const Review = require("../models/Review")

exports.createReview = async (req, res) =>{
  
    try{
      console.log(req.body)


     const review = new Review(req.body)
     
     const result = await review.save()
    
     res.status(200).json({
         status:'success',
         message:'Data inserted Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'data not inserted',
         error:error.message
     })
    }
 }

 exports.getReviews = async (req,res,)=>{
    try{
      // console.log(req.params.id)
      // const id = req.params.id;
       const reviews = await Review.find({})
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'Review get Success',
        data:reviews
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'Review not found',
        error:error.message
      })
    }
}