const Publication = require('../models/Publication');

exports.createPublication = async (req, res) =>{

    try{
     const publication = new Publication(req.body)
     const result = await publication.save()

     res.status(200).json({
         status:'success',
         message:'Publication Added Successfully',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'Publication not Added',
         error:error.message
     })
    }
 }

 exports.getPublication = async (req,res)=>{
    try{
       const publications = await Publication.find({})
      //  const categories = await Category.find({}).populate('products')
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'Publication get Success',
        data:publications
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'Publication not found',
        error:error.message
      })
    }
}
