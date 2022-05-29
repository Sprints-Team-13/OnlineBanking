const {check, validationResult} = require('express-validator');
exports.validateRequest =
    [
        check('firstName')
        .notEmpty()
        .withMessage('first name is required'),
        check('lastName')
        .notEmpty()
        .withMessage('last name is required'),
        check('email')
        .isEmail()
        .withMessage('please enter a valid email'),
        // check('password')
        // .isLength({min: 4})
        // .withMessage('password must be at least 4 characters')
    ];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0)
    {
        return res.status(400).json({ error: errors.array()[0].msg})
    }
    next();

}