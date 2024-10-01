const User = require('../models/User.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userCount = await User.countDocuments();
        if (userCount >= 5) {
            return res.status(400).json({ message: 'Maximum limit of 5 users reached' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'shhhhh', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', data: user, token: token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ message: 'all user', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
};
exports.getOneUserProfile = async (req, res) => {
    try {
        const { userId } = req.query; 
        if(!userId){
            return res.status(404).json({ message: 'User id not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(200).json({ message: 'User not matched',success:false});
        } 
        res.status(200).json({ message: 'User profile retrieved successfully',success:true,data:user});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error });
    }
};

exports.deleteUser = async (req, res,next) => {
    try {
        if(!req.query.id){
            return res.status(404).json({ message: 'User id not found' });
        }
        const user = await User.findByIdAndDelete(req.query.id);
        if (user) {
             res.status(200).json({ message: 'User deleted successfully',success:true });
        } 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password } = req.body;

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedFields = { name, email };
        if (hashedPassword) updatedFields.password = hashedPassword;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
