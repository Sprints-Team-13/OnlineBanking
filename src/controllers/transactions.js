const Transaction = require("../models/transactions")
const Beneficiary = require("../models/beneficiary")
const { getID } = require("./user")

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

exports.addBeneficiary = (req, res) => {
    Beneficiary.create({
        customerID: getID(req),
        name: req.body.name,
        accountNumber: req.body.accountNumber,
    }, function (err, data) {
        if (err) {
            console.log("Error creating data: ", err);
            res
                .status(400)
                .json(err)
        } else {
            console.log("Created: ", data);
            res
                .status(201)
                .json(data)
        }
    });
}

