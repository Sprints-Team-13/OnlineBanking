const mongoose = require('mongoose');

const  transactionsSchema = new mongoose.Schema({
    accountNumber: {
        type: String
    },
    transactionType: {
        type: String
    },
    amount: {
        type: Number
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    customerID: {
        type: String
    }
});

const Transaction = mongoose.model('Transaction', transactionsSchema);
module.exports = Transaction;