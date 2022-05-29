const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { validationResult} = require('express-validator');
exports.signup = (req, res) => {
    
    User.findOne({email: req.body.email})
    .exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered.'
        });

        // const {
        //     firstName,
        //     lastName,
        //     username,
        //     email,
        //     hash_password
        // } = req.body;
        // const _user = new User({
        //     firstName,
        //     lastName,
        //     username,
        //     email,
        //     hash_password
        // });

        // await _user.save((error, data) => {
        //     if(error)
        //     {
        //         console.log(error);
        //         return res.status(400).json({
        //             message: 'somthing went wrong'
        //         });

        //     }
            
        //     if(data) {
        //         return res.status(201).json({
        //             user: data
        //         });
        //     }
        // });

let firstName = req.body.firstName;
let lastName = req.body.lastName;
let username = req.body.username;
let email = req.body.email;
let hash_password = req.body.hash_password;

User
    .create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        hash_password: hash_password
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
            if (user.authorized === false) {
                return res.status(400).json({
                    message: 'User is not authorized'
                });
            }
            console.log(user.authenticate(req.body.hash_password));
            if(user.authenticate(req.body.hash_password)) {
                const token = jwt.sign({_id: user._id}, process.env.SHH, {expiresIn: '5d'});
                const { firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        firstName, lastName, email, role, fullName
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
    const user = jwt.verify(token, process.env.SHH);
    req.user = user;
    next();
    //jwt.decode()
}