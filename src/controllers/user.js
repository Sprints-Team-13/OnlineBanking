const User = require("../models/user");
const jwt = require('jsonwebtoken');
// var http = require('http');
var formidable = require('formidable');
var fs = require('fs');


exports.signup = (req, res) => {



    User.findOne({ email: req.body.email })

        .exec(async (error, user) => {

            if (user) return res.status(400).json({

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

                    authorized: 'true'

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
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authorized === false) {
                    return res.status(400).json({
                        message: 'User is not authorized'
                    });
                }
                //console.log(user.authenticate(req.body.hash_password));
                if (user.authenticate(req.body.hash_password) == "true") {
                    let roll = user.role
                    const token = jwt.sign({ _id: user._id, role: roll }, process.env.SHH, { expiresIn: '5d' });
                    const { fullName, phone, email, role } = user;
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

exports.validateQuestion = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {

                if (user.securityAnswer == req.body.securityAnswer && user.securityQuestion == req.body.securityQuestion) {

                    res.status(200).json({
                        message: 'Correct Answer'
                    })
                }

                else {
                    return res.status(404).json({
                        message: 'Invalid Answer'
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

exports.changePassword = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authorized === false) {
                    return res.status(400).json({
                        message: 'User is not authorized'
                    });
                }




                let email = req.body.email;
                if (error) return res.status(400).json({ error });
                User
                    .updateOne({ email: email }, { $set: { hash_password: req.body.hash_password } })
                    .exec((error, user) => {
                        if (error) return res.status(400).json({ error });
                        res.status(200).json({
                            message: 'Password updated'
                        })
                    })


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

    return user._id;
}

exports.getCurrentUser = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SHH);
    const dbUser = await User.findById(user._id).exec();

    if (dbUser) {
        res.status(200).json({ user: dbUser });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}

exports.isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SHH);


    if (user.role === 'user') {
        res.status(401).json({
            message: "Unauthorized request"
        })
    }
    //!== 'admin' || user.role !== 'super-admin'
    next();
}

exports.updateProfile = async (req, res) => {
    console.log(req.body)
    try {
        const result = await User.updateOne({
            _id: req.body.id,
        }, {
            $set: {
                fullName: req.body.fullName,
                phone: req.body.phone,
                emiratesID: req.body.emiratesID,
                addhar: req.body.addhar,
                securityQuestion: req.body.securityQuestion,
                securityAnswer: req.body.securityAnswer
            }
        }).exec();

        console.log(result, req.body);

        res.status(200).json({ result });
    } catch (e) {
        res.status(err.status).json({
            message: err.message
        })
    }
}

var formidable = require('formidable');
const path = require("path");

exports.downloadIdFile = async (req, res) => {
   
    const userId = await this.getID(req);


    // const token = req.headers.authorization.split(" ")[1];
    // const user = jwt.verify(token, process.env.SHH);

    const dbUser = await User.findById(userId).exec();

    const uploadDir = `${path.join(__dirname)}/../../uploads`;

    if (!dbUser.idFilePath || dbUser.idFilePath.length < 1) {
        return res.status(404).json({
            message: 'Not found',
        });
    }

    try {
        res.sendFile(`${dbUser.idFilePath}`,{'root': uploadDir});
    } catch (e) {
        return res.status(e.status).json({
            message: 'upload failed',
            error: e
        })
    }
}


exports.fileUpload = async (req, res) => {
    try {

        const userId = await this.getID(req);

        console.log('file upload', userId);

        const uploadDir = `${path.join(__dirname)}/../../uploads`;

        var form = new formidable.IncomingForm({
            multiples: false,
            keepExtensions: true,
            allowEmptyFiles: false,
            maxFileSize: 50 * 1024 * 1024, // 5 MB max
            uploadDir,
            filename: (name, ext, part, form) => {
                return `${userId}.${part.originalFilename.slice(part.originalFilename.length - 3)}`;
            },
            filter: ({ name, originalFilename, mimetype }) => {
                return mimetype && mimetype.includes("image");
            }
        });

        const result = form.parse(req, async function (err, fields, files) {
            if (err) {
                throw err;
            }

            if (!files.myFile) return res.status(400).json({ message: 'Invalid File, must be Image' });

            await User.updateOne({
                _id: userId,
            }, {
                $set: {
                    idFilePath: files.myFile.newFilename,
                },
            }, { multi: true }).exec();

            return res.status(200).json({ message: 'File Upload successful' });
        });
    } catch (e) {
        return res.status(e.status).json({
            message: 'upload failed',
            error: e
        })
    }
}

