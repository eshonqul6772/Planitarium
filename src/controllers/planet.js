const asyncHandler = require('../middlewares/async');
const errorResponse = require('../utils/errorResponse');
const Star = require('../models/star');
const Planet = require('../models/planet');


exports.getAllPlanet = asyncHandler(async (req, res, next) => {
    const planets = await Planet.find();

    res.status(200).json({
        success: true, data: planets
    })

});

exports.createPlanet = asyncHandler(async (req, res, next) => {
    const star = await Star.findOne({ name: req.body.star })
    const newPlanet = await Planet.create({
        name: req.body.name,
        distanceToStar: req.body.distanceToStar,
        diameter: req.body.diameter,
        yearDuration: req.body.yearDuration,
        dayDuration: req.body.dayDuration,
        temperature: req.body.temperature,
        sequenceNumber: req.body.sequenceNumber,
        satellites: req.body.satellites,
        image: 'uploads/' + req.file.filename,
        star: star._id,
    });

    await Star.findOneAndUpdate({ name: req.body.star },
        {
            $push: {
                planets: newPlanet._id
            }
        },
        { new: true, upsert: true })

    res.status(200).json({
        success: true, data: newPlanet
    })
});

exports.getStarById = asyncHandler(async (req, res, next) => {
    const planet = await Planet.findById(req.params.id);

    res.status(200).json({
        success: true, data: planet
    })

});

exports.updatePlanet = asyncHandler(async (req, res, next) => {
    const planet = await Planet.findById(req.body.id)

    const editPlanet = {
        distanceToStar: req.body.distanceToStar || planet.distanceToStar,
        diameter: req.body.diameter || planet.diameter,
        yearDuration: req.body.yearDuration || planet.yearDuration,
        dayDuration: req.body.dayDuration || planet.dayDuration,
        temperature: req.body.temperature || planet.temperature,
        sequenceNumber: req.body.sequenceNumber || planet.sequenceNumber,
        satellites: req.body.satellites || planet.satellites,
    }

    const updatePlanet = await Star.findOneAndUpdate(req.body.id, editPlanet, {new: true});

    res.status(200).json({
        success: true, data: updatePlanet
    })
});

exports.removePlanet = asyncHandler(async (req, res, next) => {
    await Planet.findOneAndDelete(req.body.id)

    res.status(200).json({
        success: true, massge: "delete succes fulll"
    })
})


