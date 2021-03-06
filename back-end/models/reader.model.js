const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
  //_id: { type:Number },
  first_name: { type: String, required: false },
  last_name:{type:String,required:false},
  email:{type:String,required:true},
  // password:{type:String,required:true},
  is_author:{type:Boolean },
  friends:[mongoose.Schema.ObjectId],
  following:[mongoose.Schema.ObjectId],
  books_read:[mongoose.Schema.ObjectId],
  wishlist:[mongoose.Schema.ObjectId],
  reviews:{type:String},
  posts:[Number],
  author_id:{type:mongoose.Schema.ObjectId },
  genre:[String],
  image:{type:String},

}, {
  timestamps: true,
});

const Reader = mongoose.model('readers', readerSchema);

module.exports = Reader;
