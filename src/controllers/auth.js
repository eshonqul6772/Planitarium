const uuid = require('uuid');

const User = require('../models/user');
const asyncHandler = require('../middlewares/async');
const errorResponse = require('../utils/errorResponse');


exports.register = asyncHandler(async (req, res, next) => {


    const { name, email, password } = req.body;

    const apiKey = uuid.v4()

    const user = await User.create({
        name,
        email,
        password,
        apiKey,

    })

    const token = user.generateJwtToken();

    res.status(201).json({ success: true, data: user, token });

});



exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new errorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new errorResponse('User not found', 404));
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return next(new errorResponse('Invalid credentials', 401));
    }

    const token = user.generateJwtToken()

    res.status(200).json({
        success: true,
        data: {
            user,
        },
        token
    });
})



