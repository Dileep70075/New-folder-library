const { default: mongoose } = require('mongoose');
const Book = require('../models/Book.models');
const BookIssue = require('../models/issued.models')
const BookReturn = require('../models/returned.models')
const User = require('../models/User.models');
exports.returnBook = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        const { bookId } = req.body;
        const Issuebook = await BookIssue.findOne({book:bookId})
        if(!Issuebook){
            return res.status(400).json({ message: 'Issue it first' });
        }
        const Bookreturn = await BookReturn.findOne({ book: bookId })
        if (Bookreturn) {
            return res.status(400).json({ message: 'Book already return' });
        }
        const newReturn = new BookReturn({
            book: bookId,
            user: req.user._id,
            returnDate: Date.now()
        });
        await newReturn.save();
        res.status(201).json({ message: 'Book returned successfully', returnRecord: newReturn });
    } catch (error) {
        res.status(500).json({ message: error.message ? error.message : error });
    }
};















exports.heldBook = async (req, res,next) => {
    try {
        const booksHeldTime = await BookIssue.aggregate([
            {
                $lookup: {
                    from: 'bookreturns',
                    localField: 'book',
                    foreignField: 'book',
                    as: 'returnDetails'
                }
            },
            {
                $unwind: {
                    path: '$returnDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
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
            {
                $project: {
                    _id: 0,
                    userName: '$userDetails.name',
                    bookName: '$bookDetails.bookName',
                    issueDate: '$issueDate',
                    returnDate: '$returnDetails.returnDate',
                    returnDate: {
                        $cond: {
                            if: { $gt: ['$returnDetails.returnDate', null] },
                            then: '$returnDetails.returnDate',
                            else: undefined
                        }
                    },
                    totalTimeHeld: {
                        $divide: [
                            {
                                $subtract: [
                                    {
                                        $cond: {
                                            if: { $gt: ['$returnDetails.returnDate', null] },
                                            then: '$returnDetails.returnDate',
                                            else: new Date()
                                        }
                                    },
                                    '$issueDate'
                                ]
                            },
                            3600000
                        ]
                    }
                }
            }
        ]);

        res.status(200).json({
            message: 'Books held by all users with issue and return dates, and total time held',
            booksHeldTime
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
};


















exports.getUserBookStatus = async (req, res,next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const books = await Book.aggregate([
            // {
            //     $match: { _id: { $eq: req.user._id } }
            // },
            {
                $lookup:{
                    from:'bookissues',
                    let:{bookId:'$_id'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $and:[
                                        {$eq:['$book','$$bookId']},
                                        {$eq:['$user',userId]}
                                    ]
                                }
                            }
                        }
                    ],
                    as:'bookissues'
                }
            },
            { $unwind: { path: '$bookissues', preserveNullAndEmptyArrays: true } },
            {
                $lookup:{
                    from:'bookreturns',
                    let:{bookId:'$_id'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $and:[
                                        {$eq:['$book','$$bookId']},
                                        {$eq:['$user',userId]}
                                    ]
                                }
                            }
                        }
                    ],
                    as:'bookreturns'
                }
            },
            { $unwind: { path: '$bookreturns', preserveNullAndEmptyArrays: true } },
            { $project: { bookName:1,category:1,rentPerDay:1, bookissues: 1, bookreturns: 1 } }
        ])
        return res.status(200).json({ message: ' get all books', data: books })
    }
    catch (error) {
        res.status(500).json({ message: error.message ? error.message : error });
    }
};