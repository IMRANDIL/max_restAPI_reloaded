const User = require('../models/user');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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




//login...


exports.postLogin = async (req, res, next) => {


    try {

        const { email, password } = req.body;
        let loadedUser;
        const user = await User.findOne({ email: email });


        if (!user) {
            const error = new Error('A user with this email could not found!');
            error.satatusCode = 401;
            throw error;

        }


        const checkpass = await bcrypt.compare(password, user.password);


        if (!checkpass) {
            const error = new Error('Invalid Credentials');
            error.satatusCode = 401;
            throw error;
        }


        //generate jwt token now....


        const token = jwt.sign({ email: user.email, userId: user._id.toString() }, 'SecretOne', { expiresIn: '1h' });


        res.status(200).json({ token: token, userId: user._id.toString() })




    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }


}









