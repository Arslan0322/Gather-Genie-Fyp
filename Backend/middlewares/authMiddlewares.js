const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../user/model")

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.userId).select('-password');

            next();
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, invalid token")
        }

    } else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

module.exports = {protect}