const mongoose = require('mongoose');

const review = mongoose.Schema({
    reviewer: mongoose.Schema.ObjectId,
    content: String
})

const bookSchema = mongoose.Schema({
    // _id : String,
    name: { type: String, required: true },
    author: { type: mongoose.Schema.ObjectId, required: true },
    publisher: { type: mongoose.Schema.ObjectId, required: true },
    bookimage: { type: String },
    avg_rating: Number,
    rating_giver: [mongoose.Schema.ObjectId],
    release_year: Number,
    genre: [String],
    description: String,
    reviews: [review]
})

module.exports = mongoose.model('books', bookSchema);