const { Router } = require("express");

const {register, login} =  require('../controllers/auth.js');

const {protected} =  require('../middlewares/auth.js');
const {getProfile, updateDetails, updatePassword, paymentBalance, activateProfile} =  require('../controllers/auth.js');


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protected, getProfile)
router.put('/update', protected, updateDetails)
router.put('/updatepassword', protected, updatePassword)
router.put('/paymentBalance', protected, paymentBalance)
router.put('/activate', protected, activateProfile)

module.exports = router;







