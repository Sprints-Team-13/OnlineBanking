const express = require('express');
const {signup, reqSignin, signin, isAuthorized, getUsers, getAccounts} = require('../../controllers/admin/auth');
const { validateRequest, isRequestValidated } = require('../../validators/auth');
const {activateAccount} = require('../../controllers/account');
const {isAdmin} = require('../../controllers/user');
const router = express.Router();
//const User = require('../models/user');

//router.post('/signin', signin);
router.post('/verify', isAdmin, isAuthorized);
router.get('/list', isAdmin, getUsers);
router.post('/approval', isAdmin, activateAccount);
router.get('/listAccounts/:id', isAdmin, getAccounts);

//router.post('/admin/signup', validateRequest, isRequestValidated, signup);
module.exports = router;