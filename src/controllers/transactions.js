const Transaction = require("../models/transactions")
const Beneficiary = require("../models/beneficiary")
const { getID } = require("./user")
const Account = require("../models/account")

//send transactions to user
exports.getTransactions = (req, res) => {
    let userID = getID(req)
    Transaction.find({ customerID: userID }).
        exec(async (error, transactions) => {
            if (error) return res.status(400).json({ error })
            res.status(200).json(transactions)
        }
        )
}

//send transactions to admin by entering user id
exports.listTransactions = (req, res) => {
    Transaction.find({ customerID: req.params.id }).
        exec(async (error, transactions) => {
            if (error) return res.status(400).json({ error })
            res.status(200).json({ transactions })
        })
}
//send all transactions
exports.allTransactions = (req, res) => {
    Transaction.find({}).
        exec(async (error, transactions) => {
            if (error) return res.status(400).json({ error });
            res.status(200).json({ transactions });
        });
}

exports.getBeneficiaries = (req, res) => {
    Beneficiary.find({ customerID: getID(req) }).
        exec(async (error, list) => {
            if (error) return res.status(400).json({ error });
            res.status(200).json({ list });
        });
}

exports.addBeneficiary = async (req, res) => {
    try {
        const data = await Account.findOne({
            accountNumber: req.body.accountNumber,
            accountStatus: 'active'
        });

        if (!data) {
            res.status(404).json({
                message: `account no ${req.body.accountNumber} not found/active`
            });

            return false;
        }

        const exists = await Beneficiary.findOne({
            customerID: getID(req),
            accountNumber: req.body.accountNumber,
        });

        if (exists) {
            res.status(404).json({
                message: `account no ${req.body.accountNumber} already added`
            });

            return false;
        }

        const beneficiary = await Beneficiary.create({
            customerID: getID(req),
            name: req.body.name,
            accountNumber: req.body.accountNumber,
        });

        res.status(201).json(beneficiary);
    } catch (err) {
        res.status(err.status).json({
            message: err.message
        })
    }

}

exports.deleteBeneficiary = (req, res) => {
    try {
         
         
        Beneficiary.deleteOne(req.query.id)
                .then(res.status(201).json({message:'Deleted Successfully'}))
                .catch(() => { 
                 res.status(400).json({message: 'Unable to delete!'})
 
                })
       
    } catch (err) {
        res.status(err.status).json({
            message: err.message
        })
    }

}


