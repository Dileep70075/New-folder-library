const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookReturnSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    returnDate: {
        type: Date,
        required: true,
    }
});
const BookReturn = mongoose.model('BookReturn', bookReturnSchema);
module.exports = BookReturn;
