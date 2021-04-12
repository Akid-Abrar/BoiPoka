const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    _id:Number,
    type:Number,
    like:Number,
    bookid:Number,
    creatorid:Number,
    content:String,
    date:Date,
    commentsIds:[Number],
    approved:Boolean
})


module.exports = mongoose.model('posts', postSchema);