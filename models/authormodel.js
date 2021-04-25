const mongoose=require('mongoose');

const authorSchema = mongoose.Schema({
    _id : Number,
    is_claimed: Boolean,
    biography: String,
    books : [Number],
    followers: [Number]
})

module.exports = mongoose.model('authors', authorSchema);