const mongoose=require('mongoose');

const bookSchema = mongoose.Schema({
    _id : Number,
    name : String,
    author : Number,
    publisher : Number,
    avg_rating: Number,
    release_year: Number,
    genre : [String],
    description: String,
    review: String
})

module.exports = mongoose.model('books', bookSchema);