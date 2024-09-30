const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now 
  },
  returnDate: {
    type: Date, 
  }
},);
const BookIssue = mongoose.model('BookIssue', bookIssueSchema);
module.exports = BookIssue;
 