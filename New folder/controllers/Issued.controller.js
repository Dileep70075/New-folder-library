const BookIssue = require('../models/issued.models'); 
const Book = require('../models/Book.models')
const User = require('../models/User.models')
exports.issueBook = async (req, res,next) => {
  try {
    if(!req.user) {
        return res.status(400).json({ message: 'User not authenticated' });
      }
    const { bookId } = req.body;
    const BOOK = await Book.findOne({_id:bookId})
    if(!BOOK){
        return res.status(400).json({ message: 'Book not exist' });
    }
    const matchBook = await BookIssue.findOne({
        $and:[
            {book:bookId},
            {user:req.user._id}
        ]
    })
    if(matchBook){
        return res.status(400).json({ message: 'Book already issue' });
    }
    const newIssue = new BookIssue({
      book: bookId,  
      user: req.user._id,  
      issueDate: Date.now() 
    });
    await newIssue.save();
    res.status(201).json({ message: 'Book issued successfully', issue: newIssue });
  } catch (error) {
    res.status(500).json({ message: error.message ? error.message : error});
  }
};
exports.getIssueBook = async (req, res) => {
  try {
      if(!req.user._id){
        return res.status(400).json({ message: 'not match id' });
      }
      const user = await BookIssue.find({} );
      if (user) {
         res.status(200).json({ message: 'all Book issued successfully',success:true,data:user});
      } 
  } catch (error) {
      res.status(500).json({ message: error.message ? error.message : error});
  }
};