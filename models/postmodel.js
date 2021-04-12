const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    _id:Number,
    text:String
})


module.exports = mongoose.model('posts', postSchema);