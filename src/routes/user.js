const express = require('express');
const { signup, reqSignin, signin, changePassword, validateQuestion, getCurrentUser, updateProfile, fileUpload, downloadIdFile } = require('../controllers/user')
const router = express.Router();
//const User = require('../models/user');
const { validateRequest, isRequestValidated } = require('../validators/auth');
const { createAccount, withdraw, recharge, transferMoney, getUserAccounts } = require('../controllers/account');
const { getBeneficiaries, addBeneficiary, deleteBeneficiary, getAllBeneficiaries } = require('../controllers/beneficiaries');
const { getTransactions } = require('../controllers/transactions');

router.post('/signup', validateRequest, isRequestValidated, signup);

router.post('/signin', signin);
router.post('/changePassword', changePassword);
router.post('/validateQuestion', validateQuestion);
router.post('/createAccount', createAccount);
router.post('/withdraw', reqSignin, withdraw);
router.post('/recharge', reqSignin, recharge);
router.post('/transfer', reqSignin, transferMoney);
router.get('/userAccounts', reqSignin, getUserAccounts);
router.get('/me', reqSignin, getCurrentUser);
router.get('/download', reqSignin, downloadIdFile);
router.get('/transactions', reqSignin, getTransactions);
router.get('/beneficiaries', reqSignin, getBeneficiaries);
router.post('/beneficiaries', reqSignin, addBeneficiary);
router.put('/updateProfile', reqSignin, updateProfile);
router.get('/allBeneficiaries', reqSignin, getAllBeneficiaries);
router.delete('/beneficiaries', reqSignin, deleteBeneficiary);

router.post('/fileupload', reqSignin, fileUpload);

module.exports = router;