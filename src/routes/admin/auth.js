const express = require('express');
const {signup, reqSignin, signin, isAuthorized, getUsers, getAccounts, allAccounts,getAdmins,createAdmin} = require('../../controllers/admin/auth');
const { validateRequest, isRequestValidated } = require('../../validators/auth');
const {activateAccount} = require('../../controllers/account');
const {isAdmin} = require('../../controllers/user');
const {listTransactions, allTransactions} = require('../../controllers/transactions')
const {updateBeneficiary} = require('../../controllers/beneficiaries')

const router = express.Router();
//const User = require('../models/user');

//router.post('/signin', signin);
router.post('/verify', isAdmin, isAuthorized);
router.get('/list', isAdmin, getUsers);
router.get('/listAdmins', isAdmin,getAdmins);
router.post('/createAdmin',  createAdmin);
 
router.post('/approval', isAdmin, activateAccount);
router.get('/listAccounts/:id', isAdmin, getAccounts);
router.get('/listTransactions/:id', isAdmin, listTransactions);
router.get('/listAccounts', isAdmin, allAccounts);
router.get('/listTransactions', isAdmin, allTransactions);
router.post('/updateBeneficiary', isAdmin, updateBeneficiary);
//router.post('/admin/signup', validateRequest, isRequestValidated, signup);


module.exports = router;