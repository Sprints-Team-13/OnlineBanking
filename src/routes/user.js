const express = require('express');
const {signup, reqSignin, signin,changePassword,validateQuestion} = require('../controllers/user')
const router = express.Router();
//const User = require('../models/user');
const { validateRequest, isRequestValidated } = require('../validators/auth');
const { createAccount, withdraw, recharge, transferMoney, getUserAccounts } = require('../controllers/account');
const { getTransactions, getBeneficiaries, addBeneficiary , deleteBeneficiary} = require('../controllers/transactions');

router.post('/signup', validateRequest, isRequestValidated, signup);
router.post('/signin', signin);
router.post('/changePassword', changePassword);
router.post('/validateQuestion', validateQuestion);
router.post('/createAccount', createAccount);
router.post('/withdraw', reqSignin, withdraw);
router.post('/recharge', reqSignin, recharge);
router.post('/transfer', reqSignin, transferMoney);
router.get('/userAccounts', reqSignin, getUserAccounts);
router.get('/transactions', reqSignin, getTransactions);
router.get('/beneficiaries', reqSignin, getBeneficiaries);
router.post('/beneficiaries', reqSignin, addBeneficiary);
router.delete('/beneficiaries', deleteBeneficiary);


module.exports = router;