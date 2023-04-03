const mongoose = require('mongoose');


const beneficiarySchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    min: 10,
    max: 12,
  },
  name: {
    type: String,
  },
  customerID: {
    type: String,
    required: true,
  },
  beneficiaryStatus: {
    type: String,
    enum: ["active", "pending", "inactive"],
    default: "pending",
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);
module.exports = Beneficiary;