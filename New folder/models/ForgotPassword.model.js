const mongoose = require('mongoose');
const forgotPasswordSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
})
const forgot = mongoose.model('forgots', forgotPasswordSchema)
module.exports = forgot;