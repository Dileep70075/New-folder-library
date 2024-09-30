const jwt = require('jsonwebtoken');
const User = require('../models/User.models')
const SECRET_KEY = 'shhhhh';
const authenticateJWT =  (req, res, next) => {

  try {
    const token = req.header('Authorization').split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Access Token Required' });
    }

    jwt.verify(token, SECRET_KEY, async(err, data) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Token' });
      }
      console.log('data',data)

      const user = await User.findById(data.userId);
      if (!user) {
          return res.status(403).json({ message: 'Invalid Token' });
      }
      req.user = user;
      next();
    });
    
  } catch (error) {
    return res.status(403).json({ message: 'Access Token Required' });
  }

};
module.exports = authenticateJWT;
