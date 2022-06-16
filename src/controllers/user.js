const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { validationResult} = require('express-validator');
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
            //console.log(user.authenticate(req.body.hash_password));
            if(user.authenticate(req.body.hash_password) == "true") {
                let roll = user.role
                const token = jwt.sign({_id: user._id, role: roll}, process.env.SHH, {expiresIn: '5d'});
                const { fullName, phone, email, role} = user;
                //request.setHeader('Authorization', 'Bearer '+token)

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
    const user = jwt.verify(token, process.env.SHH);
    req.user = user;
    next();
    //jwt.decode()
}
exports.getID = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SHH);
    console.log(user);
    return user._id;
}

exports.isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SHH);
    if (user.role != 'admin') {
        res.status(401).json({
            message: "Unauthorized request"
        })
    }
    next();
}