const mongoose=require('mongoose');

const bookSchema = mongoose.Schema({
    _id : String,
    name : {type:String,required:true},
    author : {type:String,required:true},
    publisher : {type:String,required:false},
    avg_rating: Number,
    release_year: Number,
    genre : [String],
    description: String,
    review: String
})

module.exports = mongoose.model('books', bookSchema);