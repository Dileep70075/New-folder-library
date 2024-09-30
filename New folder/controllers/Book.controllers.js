const Book = require('../models/Book.models') 
exports.createBook = async (req, res,next) => {
  try {
    const { bookName, category, rentPerDay } = req.body;
    const bookCount = await Book.countDocuments();
    if (bookCount >= 20) {
      return res.status(400).json({ message: 'Maximum limit of 20 books reached' });
    }
    const book = await Book.findOne({bookName: bookName})
    if(book){
      return res.status(200).json({ message: 'Book already exist'});
    }
    const newBook = new Book({
      bookName,
      category,
      rentPerDay
    });
    await newBook.save();
    res.status(200).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(400).json({ message: error.message ? error.message: error });
  }
};
exports.getBooks = async (req, res,next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: 'Books retrieved successfully', data:books });
  } catch (error) {
    res.status(400).json({ message: error.message ? error.message: error });
  }
};
exports.getBookById = async (req, res,next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book retrieved successfully', book });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving book', error });
  }
};
exports.updateBook = async (req, res,next) => {
  try {
    const { bookName, category, rentPerDay } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { bookName, category, rentPerDay },
      { new: true, runValidators: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};
exports.deleteBook = async (req, res,next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
};
