const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
  //_id: { type:Number },
  first_name: { type: String, required: false },
  last_name:{type:String,required:false},
  email:{type:String,required:true},
  // password:{type:String,required:true},
  is_author:{type:Boolean },
  friends:[Schema.Types.ObjectId],
  following:[Schema.Types.ObjectId],
  books_read:[Schema.Types.ObjectId],
  wishlist:[Schema.Types.ObjectId],
  reviews:{type:String},
  posts:[Schema.Types.ObjectId],
  author_id:{type:Schema.Types.ObjectId },

}, {
  timestamps: true,
});

const Reader = mongoose.model('readers', readerSchema);

module.exports = Reader;
