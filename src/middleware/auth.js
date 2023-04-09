const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel.js');
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed! Token not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error('Authentication failed! User not found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = auth;
