const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  // _id: { type:Number, required: true },
  name: { type: String, required: true },
  books: [String],
}, {
  timestamps: true,
});

const Publisher = mongoose.model('publishers', publisherSchema);

module.exports = Publisher;