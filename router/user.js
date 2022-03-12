const { postSignup, postLogin } = require('../controllers/user');
const { body } = require('express-validator')

const router = require('express').Router();

const User = require('../models/user')


router.put('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email!')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('E-mail already exists!')
                }
            })
        }).normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty()

], postSignup)



//login....

router.post('/login', postLogin)





module.exports = router;