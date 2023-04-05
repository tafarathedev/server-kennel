//how to implement jwt.verify method?
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel.js');
dotenv.config();


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.authCookies
        const decoded = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:"24h"})
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) throw new Error()
        
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.clearCookie("authCookies")
        res.status(400).json({ error: e.message })
    }
}    


module.exports = auth





