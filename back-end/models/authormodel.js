const mongoose=require('mongoose');

const authorSchema = mongoose.Schema({
    // _id : String,
    is_claimed: {type:Boolean,required:true},
    biography: {type:String,required:true},
    books : [mongoose.Schema.ObjectId],
    followers: [mongoose.Schema.ObjectId]
})

module.exports = mongoose.model('authors', authorSchema);