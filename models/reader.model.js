const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
  _id: { type:Number, required: true },
  first_name: { type: String, required: true },
  last_name:{type:String,required:true},
  password:{type:String,required:true},
  is_author:{type:Boolean , required:true},
  friends:[Number],
  following:[Number],
  books_read:[Number],
  wishlist:[Number],
  reviews:{type:String,required:true},
  posts:[Number],
  author_id:{type:Number ,required:true},

}, {
  timestamps: true,
});

const Reader = mongoose.model('readers', readerSchema);

module.exports = Reader;