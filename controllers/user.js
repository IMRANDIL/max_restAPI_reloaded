const User = require('../models/user');
const { validationResult } = require('express-validator')




exports.postSignup = async (req, res, next) => {

    try {

        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { email, name, password } = req.body;






    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error)
    }




}






