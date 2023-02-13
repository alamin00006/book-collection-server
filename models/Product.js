const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
// Schema Design
const productSchema = mongoose.Schema({
    nameB:{
        type:String,
        required:[true, 'Please Provide Product Name in Bangla'],
        // unique: true,
        trim:true,
    },
    nameE:{
        type:String,
        required:[true, 'Please Provide Product Name in English'],
        // unique: true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:[0, "Price can't be negative"]
    },
    quantity:{
        type:Number,
        required:true,
        min:[0, "Quantity can't be negative"],
        validate:{
            validator:(value) =>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false
                }
            }
        },
        message:'Quantity must be an Integer'
    },
    discount:{
        type:Number,
        default:0,
        min:[0, "Discount can't be negative"],
        validate:{
            validator:(value) =>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false
                }
            }
        },
        message:'Discount must be an Integer'
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:['in-stock', 'out-of-stock', 'discontinued'],
            message:"status can't be {VALUE}"
        }
    },
    category:{
        categoryName:{
            type:String,
            required:true
        },
        category_id:{
            type:ObjectId,
            ref:"Category",
            required:true,
        }

    },
    writer:{
        writerName:{
            type:String,
            required:true
        },
        writer_id:{
            type:ObjectId,
            ref:"Writer",
            required:true,
        }

    },
    publication:{
        publicationName:{
            type:String,
            required:true
        },
        publication_id:{
            type:ObjectId,
            ref:"Publication",
            required:true,
        }
    },
    bookFair:{
        type:String,
        default:null
    },
    productTags:[
        String
    ],
    descriptionB:{
        type:String,
        
    },
    descriptionE:{
        type:String,
        
    },
    writerDetails:{
        type:String,
        
    },
    image:{
        type:Array,
        required:true
    },
    productPdf:{
        type:Array,
    }
 
},
{
    timestamps:true
})


// middleware
productSchema.pre('save', function(next){
    if(this.quantity === 0){
        this.status = 'out-of-stock'
    }
    next()
})

productSchema.methods.getName = function(){
console.log(`this product ${this.name} added`)
}
// Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;