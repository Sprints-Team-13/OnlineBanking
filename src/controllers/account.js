const Account = require('../models/account');
const { findOne } = require('../models/user');
const {getID} = require('../controllers/user');
const Transaction = require('../models/transactions');

exports.createAccount = (req, res) => {
        let flag = true;
        let accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        Account.findOne({accountNumber: accountNumber})
        .exec( async (error, account) => {
            if(account) {
                //make sure account number is unique
                while (flag) {
                    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
                    Account.findOne({accountNumber: accountNumber})
                    .exec( async (error, account) => {
                        if(!account) {
                            flag = false;
                        }
                    });
                }
            };
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

exports.activateAccount = (req, res) => {
    Account.findOne({accountNumber: req.body.accountNumber})
    .exec( async (error, account) => {
        if(error) return res.status(400).json({error});
        if(account) {
            account.accountStatus = req.body.accountStatus;
            account.save();
            return res.status(200).json({
                message: 'Account status updated.'
            });
        }
        else {
            return res.status(400).json({
                message: 'Account not found.'
            });
        }
    });
}

exports.withdraw = (req, res) => {
    Account.findOne({accountNumber: req.body.accountNumber})
    .exec( async (error, account) => {
        if(error) return res.status(400).json({error});
        if(account && account.accountStatus === 'active' && account.accountBalance >= req.body.amount) {
            account.accountBalance -= req.body.amount;
            account.save();
            Transaction.create({
                accountNumber: account.accountNumber,
                transactionType: 'withdraw',
                amount: req.body.amount,
                transactionDate: new Date(),
                description: 'withdraw',
                customerID: account.customerID
            });
            return res.status(200).json({
                message: 'Account balance updated.'
            });
        }
        else if (account && account.accountStatus === 'active' && account.accountBalance < req.body.amount) {
            return res.status(400).json({
                message: 'Insufficient funds.'
            });
        }
        else if (account && account.accountStatus != 'active') {
            return res.status(400).json({
                message: 'Account is not active.'
            });
        }
        else {
            return res.status(400).json({
                message: 'Account not found.'
            });
        }
    });
}

exports.recharge = (req, res) => {
    Account.findOne({accountNumber: req.body.accountNumber})
    .exec( async (error, account) => {
        if(error) return res.status(400).json({error});
        if(account && account.accountStatus === 'active') {
            account.accountBalance = parseFloat(account.accountBalance) + parseFloat(req.body.amount);
            account.save();
            Transaction.create({
                accountNumber: account.accountNumber,
                transactionType: 'deposit',
                amount: req.body.amount,
                transactionDate: new Date(),
                description: 'deposit',
                customerID: account.customerID
            });
            return res.status(200).json({
                message: 'Account balance updated.'
            });
        }
        else if (account && account.accountStatus != 'active') {
            return res.status(400).json({
                message: 'Account is not active.'
            });
        }
        else {
            return res.status(400).json({
                message: 'Account not found.'
            });
        }
    });
}


exports.transferMoney = (req, res) => {
    Account.findOne({accountNumber: req.body.accountNumber})
    .exec( async (error, account) => {
        if(error) return res.status(400).json({error});
        if(account && account.accountStatus === 'active' && account.accountBalance >= req.body.amount) {
            Account.findOne({accountNumber: req.body.destinationAccountNumber})
            .exec( async (error, toAccount) => {
                if(error) return res.status(400).json({error});
                if(toAccount && toAccount.accountStatus === 'active') {
                    account.accountBalance -= req.body.amount;
                    toAccount.accountBalance = parseFloat(toAccount.accountBalance) + parseFloat(req.body.amount);
                    account.save();
                    toAccount.save();

                    // create transaction for source account
                    Transaction.create({
                        accountNumber: account.accountNumber,
                        transactionType: 'sent',
                        amount: req.body.amount,
                        transactionDate: new Date(),
                        description: 'Transfer to ' + toAccount.accountNumber,
                        customerID: account.customerID
                    });

                    // create transaction for destination account
                    Transaction.create({
                        accountNumber: toAccount.accountNumber,
                        transactionType: 'received',
                        amount: req.body.amount,
                        transactionDate: new Date(),
                        description: 'Transfer from ' + account.accountNumber,
                        customerID: toAccount.customerID
                    });
                    return res.status(200).json({
                        message: 'Transfer operation completed succesfully.'
                    });
                }
                else if (toAccount && toAccount.accountStatus != 'active') {
                    return res.status(400).json({
                        message: 'Destination Account is not active.'
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Destination Account not found.'
                    });
                }
            });
                        
        }
        else if (account && account.accountStatus === 'active' && account.accountBalance < req.body.amount) {
            return res.status(400).json({
                message: 'Insufficient funds.'
            });
        }
        else if (account && account.accountStatus != 'active') {
            return res.status(400).json({
                message: 'Account is not active.'
            });
        }
        else {
            return res.status(400).json({
                message: 'Account not found.'
            });
        }
    });
}

//get all accounts of a user and the total balance of all accounts
exports.getUserAccounts = (req, res) => {
    let userId = getID(req);
    Account.find({customerID: userId})
    .exec( async (error, accounts) => {
        if(error) return res.status(400).json({error});
        let totalBalance = 0;
            for(let i = 0; i < accounts.length; i++) {
                totalBalance += accounts[i].accountBalance;
            }
        res.status(200).json({
            accounts,
            totalBalance: totalBalance
        })
    })
}