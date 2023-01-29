const BookFair = require('../models/BookFair');

exports.createBookFair = async (req, res) =>{

    try{
     const bookFair = new BookFair(req.body)
     const result = await bookFair.save()

     res.status(200).json({
         status:'success',
         message:'Book Fair Year Added Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Book Fair year not Added',
         error:error.message
     })
    }
 }

 exports.getBookFair = async (req,res)=>{
    try{
       const bookFairs = await BookFair.find({})
      //  const categories = await Category.find({}).populate('products')
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'Book Fair get Success',
        data:bookFairs
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'Book Fair not found',
        error:error.message
      })
    }
}
