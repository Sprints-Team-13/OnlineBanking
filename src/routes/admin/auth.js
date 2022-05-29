const express = require('express');
const {signup, reqSignin, signin} = require('../../controllers/admin/auth');
const { validateRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();
//const User = require('../models/user');

router.post('/admin/signup', validateRequest, isRequestValidated, signup);
router.post('/admin/signin', signin);


module.exports = router;