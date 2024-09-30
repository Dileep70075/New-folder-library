const express = require('express');
const bookController = require('../controllers/Book.controllers'); // Import the book controller
const router = express.Router();
router.post('/books', bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);
module.exports = router;
