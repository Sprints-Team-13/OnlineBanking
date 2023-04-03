 const Beneficiary = require("../models/beneficiary")
const { getID } = require("./user")
const Account = require("../models/account")




exports.getBeneficiaries = (req, res) => {
    Beneficiary.find({ customerID: getID(req) }).
        exec(async (error, list) => {
            if (error) return res.status(400).json({ error });
            res.status(200).json({ list });
        });
}
exports.getAllBeneficiaries = (req, res) => {
    Beneficiary.find({  }).
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

exports.updateBeneficiary = (req, res) => {
    try {

        
        let id = req.body.id;
            Beneficiary.updateOne(
                {_id:req.body.id}
                , { $set: { beneficiaryStatus :  req.body.beneficiaryStatus }}
    
            ).exec((error, beneficiary) => {
                if (error) return res.status(400).json({ error });
                res.status(200).json({
    
                    message: 'Beneficairy status updated'
                })
            })
        
        
    } catch (err) {
        console.log(err);
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


