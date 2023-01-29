const Order = require('../models/Order');


exports.getOrders = async (req,res, next)=>{
    try{
        const user = req.params.user;
         const orders = await Order.find({user})
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
       res.status(200).json({
        status:'success',
        message:'data get Success',
        data:orders
       })
    }catch(error){
      res.status(400).json({
        status:'failed',
        message:'data not found',
        error:error.message
      })
    }
}
exports.getOrderDetails = async (req,res)=>{
    try{
      const id = req.params.id;
    //     const query = {_id:ObjectId(id)};
    //    const products = await Product.findOne(query)
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    const order = await Order.findById(id)
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

exports.createOrder = async (req, res) =>{
  
    try{
      // console.log(req.body)
   
     const order = new Order(req.body)
   
        
     const result = await order.save()
    
     res.status(200).json({
         status:'success',
         message:'Thanks For Your Order',
         data:result
        })
    }catch(error){
     res.status(400).json({
         status:'failed',
         message:'order not complete',
         error:error.message
     })
    }
 }
//  exports.updateProduct = async(req, res, next)=>{
//     try{
//         const {id} = req.params;
//         const result = await Product.updateOne({_id:id},{$set:req.body},{runValidators:true})
//         res.status(200).json({
//             status:'success',
//             message:'Data updated Successfully',
//             data:result
//            })
//     }catch(error){
//         res.status(400).json({
//             status:'failed',
//             message:'data not updated',
//             error:error.message
//         })
//     }
//  }
