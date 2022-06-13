const express = require('express');
const {signup, reqSignin, signin} = require('../controllers/user')
const router = express.Router();
//const User = require('../models/user');
const { validateRequest, isRequestValidated } = require('../validators/auth');
const {createAccount, withdraw, recharge, transferMoney, getUserAccounts} = require('../controllers/account');
const {getTransactions} = require('../controllers/transactions');

router.post('/signup', validateRequest, isRequestValidated, signup);
router.post('/signin', signin);
router.post('/createAccount', createAccount);
router.post('/withdraw', reqSignin, withdraw);
router.post('/recharge', reqSignin, recharge);
router.post('/transfer', reqSignin, transferMoney);
router.get('/userAccounts', reqSignin, getUserAccounts);
router.get('/transactions', reqSignin, getTransactions);


module.exports = router;