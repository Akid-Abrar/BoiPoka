const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentatorid: mongoose.Schema.Types.ObjectId,
    comment: String
},
    {
        timestamps: true,
    })

const postSchema = mongoose.Schema({
    // _id:String,
    type: Number,//type=1 for discussion,2 for review
    like: [mongoose.Schema.Types.ObjectId],
    bookid: mongoose.Schema.Types.ObjectId,//0 for comment and discussion
    creatorid: mongoose.Schema.Types.ObjectId,
    content: String,
    comments: [commentSchema],//empty string for comment,because cant comment on a comment
    approved: Boolean
},
    {
        timestamps: true,
    })


module.exports = mongoose.model('posts', postSchema);
