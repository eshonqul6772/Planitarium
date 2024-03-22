const jwt = require('jsonwebtoken');
const asyncHeader = require('./async');
const User = require('../models/user');
const ErorResponse = require('../utils/errorResponse');


exports.protected = asyncHeader(async(req,res, next)=>{
    let token   = req.headers.authorization.split(' ')[1];

    if(!token){
        return next(new ErorResponse('Please provide a token', 401));
    }

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
        if(err){
            return next(new ErorResponse('Please provide a valid token', 401));
        }

        const user = await User.findById(decoded.id);

        if(!user){
            return next(new ErorResponse('Please provide a valid token', 401));
        }

        req.user = user;
        next();
    })// @desc      Activate Status
    // @route     PUT /api/v1/auth/activate
    // @access    Private
});

exports.adminAccess = asyncHeader(async(req, res, next)=>{
    if(!req.user.adminStatus){
        next(new ErorResponse('this routes can be access only admin user', 403))
    }
    next()
});

exports.apiKeyAccess = asyncHeader(async (req, res, next) => {
    let key;
    
    console.log(req.headers["apikey"])

    if(req.headers["apikey"]){
      key = req.headers["apikey"]
    }
  
    if(!key){
      return next(new ErorResponse('No API Key to access this route', 403))
    }
  
    const user = await User.findOne({ apiKey: key })
  

    if(!user){
      return next(new ErorResponse('No user found by this API Key', 400))
    }
  
    if(!user.isActive){
      return next(new ErorResponse('Please activate your status to get response', 403))
    }
  
    next()
  }) 