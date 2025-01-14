const mongoose = require('mongoose');
const bookIssueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now 
  },
  returnDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['none', 'issued', 'returned'],
    default: 'none'
  }
}, {
  timestamps: true
});

// Create the model
const BookIssue = mongoose.model('BookIssue', bookIssueSchema);

module.exports = BookIssue;
