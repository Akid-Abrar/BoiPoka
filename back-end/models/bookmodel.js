const mongoose=require('mongoose');

const bookSchema = mongoose.Schema({
    // _id : Number,
    name : {type:String,required:true},
    author : {type:mongoose.Schema.ObjectId,required:true},
    publisher : {type:mongoose.Schema.ObjectId,required:true},
    bookimage:{type:String},
    avg_rating: Number,
    release_year: Number,
    genre : [String],
    description: String,
    review: String
})

module.exports = mongoose.model('books', bookSchema);