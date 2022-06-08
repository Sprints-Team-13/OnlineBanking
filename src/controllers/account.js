const Account = require('../models/account');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/user');
const {getID} = require('../controllers/user');

exports.createAccount = (req, res) => {
        let accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        Account.findOne({accountNumber: accountNumber})
        .exec( async (error, account) => {
            if(account) return res.status(400).json({
                message: 'Please try again.'
            });
            if (error) return res.status(400).json({
                message: error
            });
            
        let accountType = req.body.accountType;
        let accountBalance = req.body.accountBalance;

        Account
            .create({
                accountNumber: accountNumber,
                customerID: getID(req),
                accountType: accountType,
                accountBalance: accountBalance,
            }, function (err, account) {
                if (err) {
                    console.log("Error creating Account: ", err);
                    res
                        .status(400)
                        .json(err)
                } else {
                    console.log("Account Created: ", account);
                    res
                        .status(201)
                        .json(account)
                }
            })

    });
}