const mongoose=require('mongoose');

const bookSchema = mongoose.Schema({
    // _id : String,
    name : {type:String,required:true},
    author : {type:mongoose.Schema.Types.ObjectId,required:true},
    publisher : {type:mongoose.Schema.Types.ObjectId,required:false},
    avg_rating: Number,
    release_year: Number,
    genre : [String],
    description: String,
    review: String
})

module.exports = mongoose.model('books', bookSchema);