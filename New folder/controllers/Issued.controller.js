const BookIssue = require('../models/issued.models');
const Book = require('../models/Book.models')
const BookReturn = require('../models/returned.models')
const User = require('../models/User.models');
const { default: mongoose } = require('mongoose');


exports.issueBook = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    const { bookId } = req.body;
    const BOOK = await Book.findOne({ _id: bookId })
    if (!BOOK) {
      return res.status(400).json({ message: 'Book not exist' });
    }
    const matchBook = await BookIssue.findOne({
      user: req.user._id,
      book: bookId,
      status: 'issued'
    })
    if (matchBook) {
      return res.status(400).json({ message: 'Book already issue' });
    }
    const newIssue = new BookIssue({
      book: bookId,
      user: req.user._id,
      issueDate: Date.now(),
      status: 'issued'
    });
    await newIssue.save();
    res.status(201).json({ message: 'Book issued successfully', issue: newIssue });
  } catch (error) {
    res.status(500).json({ message: error.message ? error.message : error });
  }
};








exports.returnBook = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    const { bookId } = req.body;
    const Bookreturn = await BookIssue.findByIdAndUpdate({ _id: bookId });
    if (!Bookreturn) {
      return res.status(404).json({ message: 'No active issued book found for this user' });
    }
    if (Bookreturn.status === 'returned') {
      return res.status(400).json({ message: 'Book has already been returned' });
    }
    Bookreturn.status = 'returned';
    Bookreturn.returnDate = new Date();
    await Bookreturn.save();
    res.status(200).json({ message: 'Book returned successfully', Bookreturn: Bookreturn });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error: error.message });
  }
};











exports.getIssueBook = async (req, res) => {
  try {
    if (!req.user._id) {
      return res.status(400).json({ message: 'not match id' });
    }
    const user = await BookIssue.find({});
    if (user) {
      res.status(200).json({ message: 'all Book issued successfully', success: true, data: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message ? error.message : error });
  }
};













exports.heldBook = async (req, res, next) => {
  try {
    const booksHeldTime = await BookIssue.aggregate([
      // Lookup to get user details
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },

      // Lookup to get book details
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },

      // Project the necessary fields
      {
        $project: {
          _id: 0,
          userName: '$userDetails.name',
          email: '$userDetails.email',
          bookName: '$bookDetails.bookName',
          issueDate: '$issueDate',
          returnDate: '$returnDate',
          totalTimeHeld: {
            $divide: [
              {
                $subtract: [
                  { $ifNull: ['$returnDate', new Date()] },
                  '$issueDate'
                ]
              },
              3600000 // Convert milliseconds to hours
            ]
          }
        }
      }
    ]);

    res.status(200).json({
      message: 'Books held by all users with issue and return dates, and total time held',
      booksHeldTime
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error: error.message });
  }
};








exports.getBooksStatus = async (req, res) => {
  try {
    const booksStatus = await BookIssue.aggregate([
      // Lookup to get user details
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      // Lookup to get book details
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },
      // Determine the status based on issueDate and returnDate
      {
        $project: {
          _id: 0,
          userName: '$userDetails.name',
          email: '$userDetails.email',
          bookName: '$bookDetails.bookName',
          category: '$bookDetails.category',
          rentPerDay: '$bookDetails.rentPerDay',
          issueDate: '$issueDate',
          returnDate: '$returnDate',
          status: {
            $cond: {
              if: { $eq: ['$status', 'none'] },
              then: 'none',
              else: {
                $cond: {
                  if: { $ne: ['$returnDate', null] },
                  then: 'returned',
                  else: 'issued'
                }
              }
            }
          }
        }
      }
    ]);

    res.status(200).json({
      message: 'Books with status information',
      booksStatus: booksStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book status', error: error.message });
  }
};










exports.bookDetailAndIssueAndReturn = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const books = await Book.aggregate([
      {
        $lookup: {
          from: 'bookissues',
          let: { bookId: '$_id', userId: userId },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$book', '$$bookId'] },
                    { $eq: ['$user', '$$userId'] }
                  ]
                }
              }
            },
            {
              $sort: { issueDate: -1 } // Sort to get the latest issue first
            },
            {
              $limit: 1 // Only keep the latest issue status per book
            }
          ],
          as: 'issueANDreturn'
        }
      },
      {
        $unwind: { path: '$issueANDreturn', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup:{
          from:'users',
          localField:'issueANDreturn.user',
          foreignField:'_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          issueBookId:'$issueANDreturn._id',
          userId: '$issueANDreturn.user',
          userName: '$userDetails.name',
          userEmail: '$userDetails.email',
           status: { $ifNull: ['$issueANDreturn.status', 'none'] },
          book: '$bookName',
          category: '$category',
          rentPerDay: '$rentPerDay',
          
        }
      },
      // {
      //   $sort: { status: 1, book: 1 } // Sort by status and then by book name
      // },
      // {
      //   $group: {
      //     _id: '$status',
      //     books: {
      //       $push: {
      //         id: '$id',
      //         name: '$userName',
      //         email: '$userEmail',
      //         book: '$book',
      //         category: '$category',
      //         rentPerDay: '$rentPerDay'
      //       }
      //     }
      //   }
      // }
    ]);

    res.status(200).json({
      message: 'Books retrieved successfully',
      groupedBooks: books
    });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};


