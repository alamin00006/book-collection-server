const Product = require('../models/Product');
const Category = require('../models/Category');
const UploadProductImage = require('../models/UploadProductImage');
const fs= require('fs');
const path=require('path');
const dirPath= path.join(__dirname,'../public/uploads');


exports.getProducts = async (req,res, next)=>{
    try{
        const productTotalCount = await Product.countDocuments({})
        const page = parseInt(req.query?.page)
        const size = parseInt(req.query?.size)
          if(page || size){
            const products = await Product.find({}).skip(page*size).limit(size);
            res.status(200).json({
                status:'success',
                message:'data get Success',
                data:{
                    products,
                    productTotalCount
                }
               })
          }
          else{
            const products = await Product.find({})
            res.status(200).json({
                status:'success',
                message:'data get Success',
                data:products
                 
               })
          }
            
             
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'data not found',
        error:error.message
      })
    }
}

exports.getAllProductsManage = async (req,res, next)=>{
    try{

       const page = parseInt(req.query?.page)
       const size = parseInt(req.query?.size)
       const productTotalCount = await Product.countDocuments({})
       const products = await Product.find({}).skip(page*size).limit(size)
 
       res.status(200).json({
        status:'success',
        message:'data get Success',
        data:{
            products,
            productTotalCount
        }
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'data not found',
        error:error.message
      })
    }
}
exports.getProductsDetails = async (req,res, next)=>{
    try{
        const id = req.params.id;
    //     const query = {_id:ObjectId(id)};
    //    const products = await Product.findOne(query)
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    const product = await Product.findById(id)
       res.status(200).json({
        status:'success',
        message:'data get Success',
        data:product
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
    //   console.log(req.body)
      console.log(req?.files.image[0].path)
      console.log(req?.files.pdf[0].path)
    const categoryParse = JSON.parse(req.body.category)
    const writerParse = JSON.parse(req.body.writer)
    const publicationParse = JSON.parse(req.body.publication)
    // console.log(categoryParse.category_id)
  
     const product = new Product({
        nameB:req.body.nameB,
        nameE:req.body.nameE,
        price: req.body.price,
        quantity:req.body.quantity,
        discount:req.body.discount,
        status:req.body.status,
        category:{
            categoryName:categoryParse.categoryName,
            category_id:categoryParse.category_id
        },
        writer:{
            writerName:writerParse.writerName,
            writer_id:writerParse.writer_id
        },
        publication:{
            publicationName:publicationParse.publicationName,
            publication_id:publicationParse.publication_id
        },
        bookFair:req.body.bookFair,
        productTags:req.body.productTags,
        descriptionB:req.body.descriptionB,
        descriptionE:req.body.descriptionE,
        writerDetails:req.body.writerDetails,
        BookSalesInfo:req.body.BookSalesInfo,
        image:req?.files.image[0].path,
        productPdf:req?.files.pdf[0].path
     })
    
 
    // in Category product Push start
   
     const {_id:productId, category} = product;
     await Category.updateOne({_id:category.
        category_id},
        {$push:{products:productId}})
    // in Category Product push end
        
     const result = await product.save()
    
     res.status(200).json({
         status:'success',
         message:'Product Upload Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Sorry Something is Wrong',
         error:error.message
     })
    }
 }
 exports.updateProduct = async(req, res, next)=>{
    try{
        console.log(req.body)
        // console.log(req?.files)
        const categoryParse = JSON.parse(req.body.category)
        const writerParse = JSON.parse(req.body.writer)
        const publicationParse = JSON.parse(req.body.publication)
       
        const {id} = req.params;
        
        const updateData = {
            
                nameB:req.body.nameB,
                nameE:req.body.nameE,
                price: req.body.price,
                quantity:req.body.quantity,
                discount:req.body.discount,
                status:req.body.status,
                category:{
                    categoryName:categoryParse.categoryName,
                    category_id:categoryParse.category_id
                },
                writer:{
                    writerName:writerParse.writerName,
                    writer_id:writerParse.writer_id
                },
                publication:{
                    publicationName:publicationParse.publicationName,
                    publication_id:publicationParse.publication_id
                },
                bookFair:req.body.bookFair,
                descriptionB:req.body.descriptionB,
                writerDetails:req.body.writerDetails,
                BookSalesInfo:req.body.BookSalesInfo,
                
                        
             }
    
        const result = await Product.updateOne({_id:id},{$set:updateData},{runValidators:true})
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


 exports.deleteProduct = async(req, res, next)=>{
    try{
      
        const {id} = req.params;
        const imageData = req.body.image[0].split('\\')[2]
        const pdfData = req.body.productPdf[0].split('\\')[2]
      
          fs.readdir(dirPath,(err,files)=>{
           const fileData = files.find(item => item === imageData)
         

        fs.stat(`./public/uploads/${fileData}`, function (err, stats) {
    
            if (err) {
                return;
            }
         
            fs.unlink(`./public/uploads/${fileData}`,function(err){
                 if(err) return;
                 
            });  
         });
        
        }
        )
          fs.readdir(dirPath,(err,pdfFiles)=>{
           const pdfFile = pdfFiles.find(item => item === pdfData)
        
          fs.stat(`./public/uploads/${pdfFile}`, function (err, stats) {
            if (err) {
                return;
            }
         
            fs.unlink(`./public/uploads/${pdfFile}`,function(err){
                 if(err) return;
            });  
         });
        
        }
        )

       const result = await Product.findByIdAndDelete({_id:id})

      await Category.findOneAndUpdate({ products: id }, { $pull: { products: id } }, { new: true });

        res.status(200).json({
            status:'success',
            message:'delete Successfully',
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