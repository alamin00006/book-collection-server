
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    forProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type:String,
        required: true
    },

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
}, {
    timestamps:true
});

const Review = mongoose.model('Rating', ReviewSchema);
module.exports = Review;