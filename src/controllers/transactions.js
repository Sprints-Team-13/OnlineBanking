const Transaction = require("../models/transactions")
const { getID } = require("./user")


exports.getTransactions = (req, res) => {
    let userID = getID(req)
    Transaction.find({cunstomerID: userID}).
    exec(async (error, transactions) => {
        if (error) return res.status(400).json({ error })
        res.status(200).json(transactions)
    }
    )
}
