const Writer = require('../models/Writer');

exports.createWriter = async (req, res) =>{

    try{
     const writer = new Writer(req.body)
     const result = await writer.save()

     res.status(200).json({
         status:'success',
         message:'Writer Added Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Writer not Added',
         error:error.message
     })
    }
 }

 exports.getWriters = async (req,res)=>{
    try{
       const writers = await Writer.find({})
      //  const categories = await Category.find({}).populate('products')
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'Writer get Success',
        data:writers
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'Writer not found',
        error:error.message
      })
    }
}
