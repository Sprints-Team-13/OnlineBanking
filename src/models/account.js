const mongoose = require('mongoose');


const bankAccountSchema = new mongoose.Schema({

    accountNumber: {
        type: String,
        required: true,
        min: 10,
        max: 12,
    },
    customerID: {
        type: String,
        required: true,
    },
    accountBalance: {
        type: Number,
        required: true,
        min: 0,
    },
    accountType: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    accountStatus: {
        type: String,
        enum: ["active", "pending", "closed"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Account = mongoose.model('Account', bankAccountSchema);
module.exports = Account;