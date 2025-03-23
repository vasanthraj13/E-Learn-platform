const { Router } = require("express");
const { RegisterUser, userCurrentController, userlogin,profile } = require('../controllers/user.controller.js');
const { AuthVerify } = require("../middlewares/AuthVerify");

const router = Router();

router.post('/login', userlogin);
router.post('/register',RegisterUser)

router.post('/profile',profile)
router.get('/current',AuthVerify, userCurrentController);
module.exports = router;