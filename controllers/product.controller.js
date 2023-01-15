const Product = require('../models/Product');
const Category = require('../models/Category');
const UploadProductImage = require('../models/UploadProductImage');


exports.getProducts = async (req,res, next)=>{
    try{
       const products = await Product.find({})
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'data get Success',
        data:products
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'data not found',
        error:error.message
      })
    }
}

exports.createProduct = async (req, res) =>{
  
    try{
    // const arrayImages = [];
    // for (let i = 0; i < req.file.length; i++) {
    //    return arrayImages[i] = req.file.filename[i];
        
    // }
    
    const categoryParse = JSON.parse(req.body.category)
    console.log(categoryParse.category_id)
    //  const product = new Product(req.body)
      
    //  const product = new Product({image:req.file.filename})
    // req.body.image = req.file.path
     const product = new Product({
        name:req.body.name,
        description:req.body.description,
        price: req.body.price,
        quantity:req.body.quantity,
        status:req.body.status,
        category:{
            categoryName:categoryParse.categoryName,
            category_id:categoryParse.category_id
        },
        image:req?.file?.path
     })
    
    // in Category product Push start
   
    //  const {_id:productId, category} = product;
    //  await Category.updateOne({_id:category.id},
    //     {$push:{products:productId}})
    // in Category Product push end
        
     const result = await product.save()
    //  result.getName()
 
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
 exports.updateProduct = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const result = await Product.updateOne({_id:id},{$set:req.body},{runValidators:true})
        res.status(200).json({
            status:'success',
            message:'Data updated Successfully',
            data:result
           })
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'data not updated',
            error:error.message
        })
    }
 }
 exports.fileUpload = async(req, res, next)=>{
    try{
        console.log(req.file.filename)
        const imageFile = new UploadProductImage({image:req.file.filename})
       
        const image = await imageFile.save()
        res.status(200).json({
            status:'success',
            message:'image uploaded Successfully',
            data:image
           })
    }catch(error){
        res.status(400).json({
            status:'failed',
            message:'image not upload',
            error:error.message
        })
    }
 }