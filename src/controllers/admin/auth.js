const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const { findOne } = require("../../models/user");
exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered.'
        });

        
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
            if(user.authenticate(req.body.hash_password) && user.role === 'admin') {
                const token = jwt.sign({_id: user._id}, process.env.SHH, {expiresIn: '5d'});
                const { firstName, lastName, email, role, fullName} = user;
                //req.headers.authorization = token;
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
    if(token === "null") {
        return res.status(401).json({
            message: "unauthorized request"
        });
    }
    //console.log(token);
    const user = jwt.verify(token, process.env.SHH, (error, user) => {
        if(error) return res.status(401).json({
            message: "Auth Failed"
            });
           
    req.user = user;
    User.findOne({_id: req.user._id})
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
});
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
