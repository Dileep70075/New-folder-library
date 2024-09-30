const mongoose = require('mongoose')
const mongoDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/library')
            .then(() => {
                console.log('connection successfully')
            })
            .catch((error) => {
                console.error('internal error:', error);
            })
    }
    catch (error) {
        console.error('internal error:', error);
    }

}
module.exports = mongoDB()