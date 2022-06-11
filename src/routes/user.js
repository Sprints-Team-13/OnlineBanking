const express = require('express');
const {signup, reqSignin, signin} = require('../controllers/user')
const router = express.Router();
//const User = require('../models/user');
const { validateRequest, isRequestValidated } = require('../validators/auth');
const {createAccount, withdraw, recharge, transferMoney, getUserAccounts} = require('../controllers/account');

router.post('/signup', validateRequest, isRequestValidated, signup);
router.post('/signin', signin);
router.post('/createAccount', createAccount);
router.post('/withdraw', reqSignin, withdraw);
router.post('/recharge', reqSignin, recharge);
router.post('/transfer', reqSignin, transferMoney);
router.get('/userAccounts', reqSignin, getUserAccounts);

router.post('/profile', reqSignin, (req,res) => {
    res.status(200).json( {user: 'profile'});
});

module.exports = router;