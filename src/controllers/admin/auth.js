const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const { findOne } = require("../../models/user");
const { request } = require("express");
const Account = require("../../models/account");
const { getID } = require("../user");
exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered.'
        });

        
let fullName = req.body.fullName;
let phone = req.body.phone;
let email = req.body.email;
let hash_password = req.body.hash_password;

User
    .create({
        fullName: fullName,
        phone: phone,
        email: email,
        hash_password: hash_password,
        role: 'admin'
    }, function (err, user) {
        if (err) {
            console.log("Error creating User: ", err);
            res
                .status(400)
                .json(err)
        } else {
            console.log("User Created: ", user);
            res
                .status(201)
                .json(user)
        }
    })

    });
};


exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec( async (error, user) => {
        if(error) return res.status(400).json({error});
        if(user) {
            console.log(user.authenticate(req.body.hash_password));
            if(user.authenticate(req.body.hash_password) == "true" && user.role === 'admin') {
                const token = jwt.sign({_id: user._id}, process.env.SHH, {expiresIn: '5d'});
                const { fullName, phone, email, role} = user;
                //req.headers.authorization = token;
                //res.setHeader('Authorization', 'Bearer '+token)
                res.status(200).json({
                    token,
                    user: {
                        fullName, phone, email, role
                    }
                })
            }
            else {
                return res.status(400).json({
                    message: 'Invalid Password'
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Invalid Email'
            })
        }
    });
}

exports.reqSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(token === "null") {
        return res.status(401).json({
            message: "unauthorized request"
        });
    }
    //console.log(token);
    let user
    const visitor = jwt.verify(token, process.env.SHH, (error, visitor) => {
        if(error) {
            return res.status(401).json({
                message: "unauthorized request"
                });
        }

        user = visitor
    });
           
    User.findOne({_id: user._id})
    .exec( async (error, user) => {
        if(error) return res.status(400).json({error});
        if(user.role === 'user') {
            return res.status(400).json({
                message: 'User not authorized'
            });
        }
        next();
    });
    //console.log(req.user);
    
    //jwt.decode()
}

//accept or reject users to login
exports.isAuthorized = (req, res, next) => {
    User.findOne({email:req.body.email})
    .exec( async (error, user) => {
        console.log(req.body.email);
        let email = req.body.email;
        let authorized = req.body.authorized;
        console.log(authorized);
        if(error) return res.status(400).json({error});
        User
        .updateOne( {email: email}, {$set: {authorized: authorized}})
        .exec( (error, user) => {
            if(error) return res.status(400).json({error});
            res.status(200).json({
                message: 'Authorized status updated'
            })
        })
    });
}
// get all users
exports.getUsers = (req, res) => {
    User.find({})
    .exec( async (error, users) => {
        if(error) return res.status(400).json({error});
        res.status(200).json({
            users
        })
    })
}

//get all accounts
exports.getAccounts = (req, res) => {
    console.log(req.params.id);
    Account.find({customerID: req.params.id})
    .exec( async (error, accounts) => {
        console.log(req.params.id)
        if(error) return res.status(400).json({error});
        res.status(200).json({
            accounts
        })
    })
}

exports.allAccounts =(req, res) => {
    Account.find({}).
    exec( async (error, accounts) =>{
        if (error) return res.status(400).json({error});
        res.status(200).json({accounts});
    })
}