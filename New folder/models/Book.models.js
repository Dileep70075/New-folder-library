const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true, 
    trim: true
  },
  rentPerDay: {
    type: Number, 
    required: true, 
    min: 0 
  }
},);
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
 