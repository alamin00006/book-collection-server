const Category = require('../models/Category');

exports.createCategory = async (req, res) =>{

    try{
     const category = new Category(req.body)
     const result = await category.save()

     res.status(200).json({
         status:'success',
         message:'Category inserted Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Category not inserted',
         error:error.message
     })
    }
 }

 exports.getCategories = async (req,res)=>{
    try{
       const categories = await Category.find({})
      //  const categories = await Category.find({}).populate('products')
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'Category get Success',
        data:categories
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'category not found',
        error:error.message
      })
    }
}

exports.getCategoryDetails = async (req,res)=>{
  try{
    const id = req.params.id;
  //     const query = {_id:ObjectId(id)};
  //    const products = await Product.findOne(query)
  //     where("name").equals(/\w/)
  //    .where('quantity').gte(100)
  const order = await Category.findById(id).populate('products')
     res.status(200).json({
      status:'success',
      message:'data get Success',
      data:order
     })
  }catch(error){
    res.status(400).json({
      status:'failed',
      message:'data not found',
      error:error.message
    })
  }
}
