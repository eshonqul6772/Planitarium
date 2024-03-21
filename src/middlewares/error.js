const errorResponse = require('../utils/errorResponse')

const errorHandler = (err,req, res, next)=>{
    let error = {...err};


    error.massage = err.massage;

    console.log(err.stack.red)

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.massage || 'Server error'
    })
}

module.exports = errorHandler;