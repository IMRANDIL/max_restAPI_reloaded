const User = require('../models/user');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')



exports.postSignup = (req, res, next) => {



    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const { email, name, password } = req.body;


    bcrypt.hash(password, 12).then((hashedPass) => {
        const user = new User({
            email: email,
            password: hashedPass,
            name: name
        });
        return user.save()
    }).then((user) => {
        res.status(201).json({ message: 'User Created', userId: user._id })
    }).catch((error) => {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    })

















}






