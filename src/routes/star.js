const {Router} = require('express');

const {createNewStar, getAllStar, getStarById, updateStar,removeStar} = require('../controllers/star');

const upload = require('../utils/fileUploader')

const router = Router();

router.post('/', upload.single('image'), createNewStar)
router.get('/', getAllStar);
router.get('/:id', getStarById);
router.put('/:id', updateStar);
router.delete('/:id', removeStar);


module.exports = router;