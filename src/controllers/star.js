const Star = require('../models/star');
const asyncHandler = require('../middlewares/async');
const errorResponse = require('../utils/errorResponse');


exports.createNewStar = asyncHandler(async (req, res, next) => {
    const newStar = await Star.create({
        name: req.body.name,
        temperature: req.body.temperature,
        mass: req.body.mass,
        image: 'uploads/' + req.file.filename,
        diameter: req.body.diameter,
    
    });

    res.status(200).json({
        success: true, data: newStar
    })
});

exports.getAllStar = asyncHandler(async (req, res, next) => {
    const starts = await Star.find();

    res.status(200).json({
        success: true, data: starts
    })

});


exports.getStarById = asyncHandler(async (req, res, next) => {
    const star = await Star.findById(req.body.id);

    res.status(200).json({
        success: true, data: star
    })
});

exports.updateStar = asyncHandler(async (req, res, next) => {
    const star = await Star.find(req.body.id)

    const editStar = {
        name: req.body.name || star.name,
        temperature: req.body.temperature || star.temperature,
        mass: req.body.mass || star.mass,
        image: req.body.image || star.image,
        diameter: req.body.diameter || star.diameter,
    };

    const updateStar = await Star.findOneAndUpdate(req.body.id, editStar, {new: true});
    res.status(200).json({
        success: true, data: updateStar
    })
});

exports.removeStar = asyncHandler(async (req, res, next) => {
    await Star.findOneAndDelete(req.body.id);

    res.status(200).json({
        success: true, message: 'delete success full'
    })
});