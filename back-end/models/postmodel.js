const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    // _id:Number,
    type:Number,//type=1 for discussion,2 for review,3 for comment
    like:Number,
    bookid:String,//0 for comment and discussion
    creatorid:String,
    content:String,
    commentsIds:[String],//empty string for comment,because cant comment on a comment
    approved:Boolean
},
{
    timestamps: true,
})


module.exports = mongoose.model('posts', postSchema);