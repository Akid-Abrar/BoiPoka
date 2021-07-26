const mongoose=require('mongoose');

const authorSchema = mongoose.Schema({
    // _id : String,
    first_name:{type:String},
    last_name:{type:String},
    image:{type:String},
    biography: {type:String},
    books : [mongoose.Schema.ObjectId],
    followers: [mongoose.Schema.ObjectId]
})

module.exports = mongoose.model('authors', authorSchema);