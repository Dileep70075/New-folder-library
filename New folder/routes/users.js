const express = require('express');
const userController = require('../controllers/Uers.controllers');
const issuedController = require('../controllers/Issued.controller')
const returnedController = require('../controllers/Returned.controller')
const router = express.Router();
const Authmiddleware = require('../Authorization/Aauthorization')
router.post('/register', userController.registerUser); 
router.post('/login', userController.loginUser);      
router.get('/allUser',  userController.getUserProfile); 
router.post('/issued',Authmiddleware, issuedController.issueBook); 
router.get('/getIssueBook',Authmiddleware, issuedController.getIssueBook); 
router.post('/returned',Authmiddleware, returnedController.returnBook); 
router.get('/heldBook', returnedController.heldBook); 
router.get('/getUserBookStatus',Authmiddleware, returnedController.getUserBookStatus);




router.get('/getOneUserProfile', userController.getOneUserProfile); 
router.put('/updateUser', userController.updateUser); 
router.delete('/deleteUser', userController.deleteUser);
module.exports = router;
