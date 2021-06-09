const mongoose=require('mongoose');

const authorSchema = mongoose.Schema({
    // _id : Number,
    is_claimed: {type:Boolean,required:true},
    biography: {type:String,required:true},
    books : [Number],
    followers: [Number]
})

module.exports = mongoose.model('authors', authorSchema);