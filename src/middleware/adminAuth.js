const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AdminUser = require('../models/Admin/api/AdminModel.js');
dotenv.config();
  

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminAuthCookies
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET)
        const admin = await AdminUser.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!admin) {
            throw new Error("")
        }

        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.clearCookie("adminAuthCookies")
        res.status(400).json({ error: e.message })
    }
}    


module.exports = adminAuth





