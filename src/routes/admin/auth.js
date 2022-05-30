const express = require('express');
const {signup, reqSignin, signin, isAuthorized, getUsers} = require('../../controllers/admin/auth');
const { validateRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();
//const User = require('../models/user');

router.post('/admin/signup', validateRequest, isRequestValidated, signup);
router.post('/admin/signin', signin);
router.post('/admin/verify', isAuthorized);
router.get('/admin/list', getUsers);


module.exports = router;