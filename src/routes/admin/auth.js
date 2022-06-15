const express = require('express');
const {signup, reqSignin, signin, isAuthorized, getUsers, getAccounts} = require('../../controllers/admin/auth');
const { validateRequest, isRequestValidated } = require('../../validators/auth');
const {activateAccount} = require('../../controllers/account');
const router = express.Router();
//const User = require('../models/user');

router.post('/admin/signup', validateRequest, isRequestValidated, signup);
router.post('/admin/signin', signin);
router.post('/admin/verify', reqSignin, isAuthorized);
router.get('/admin/list', reqSignin, getUsers);
router.post('/admin/approval', reqSignin, activateAccount);
router.get('/admin/listAccounts/:id', reqSignin, getAccounts);



module.exports = router;