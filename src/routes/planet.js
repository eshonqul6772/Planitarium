const { Router } = require('express');

const { createPlanet, getAllPlanet ,getStarById, updatePlanet, removePlanet} = require('../controllers/planet');

const upload = require('../utils/fileUploader')

const router = Router();

router.post('/', upload.single('image'), createPlanet);
router.get('/', getAllPlanet);
router.get('/:id', getStarById);
router.put('/:id', updatePlanet);
router.delete('/:id', removePlanet);


module.exports = router;