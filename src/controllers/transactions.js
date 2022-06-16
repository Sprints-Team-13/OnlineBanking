const Transaction = require("../models/transactions")
const { getID } = require("./user")

//send transactions to user
exports.getTransactions = (req, res) => {
    let userID = getID(req)
    Transaction.find({customerID: userID}).
    exec(async (error, transactions) => {
        if (error) return res.status(400).json({ error })
        res.status(200).json(transactions)
    }
    )
}

//send transactions to admin by entering user id
exports.listTransactions = (req, res) => {
    Transaction.find({customerID: req.params.id}).
    exec(async (error, transactions) => {
        if (error) return res.status(400).json({error})
        res.status(200).json({transactions})
    })
}
//send all transactions
exports.allTransactions = (req, res) => {
    Transaction.find({}).
    exec (async(error, transactions) => {
        if (error) return res.status(400).json({error});
        res.status(200).json({transactions});
    })
}