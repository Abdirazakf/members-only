const db = require('../db/queries.js')
const {body, validationResult, matchedData} = require('express-validator')
const bcrypt = require('bcryptjs')

const emailErr = "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.'"

const validateSignUp = [
    body('first_name').trim().notEmpty()
    .withMessage('First Name is required'),
    body('last_name').optional().trim().notEmpty()
    .withMessage('Last Name is required'),
    body('email').trim().isEmail().normalizeEmail()
    .withMessage(emailErr),
    body('pass').trim().isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    .withMessage('Password must be at least 6 chars with 1 uppercase, 1 number, and 1 symbol'),
    body('confirm').trim()
    .custom((value, {req}) => {
        return value === req.body.pass
    }).withMessage('Passwords Must Match')
]

exports.checkValidUserPost = [
    validateSignUp,
    async(req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        try {
            const {first_name, last_name, email, pass} = matchedData(req)

            // Check if email is already taken
            const existingUser = await db.checkEmail(email)

            if (existingUser){
                return res.status(400).json({
                    errors: [{msg: 'Email already taken'}]
                })
            }

            const hashedPass = await bcrypt.hash(pass, 10)

            await db.createUser({
                firstName: first_name,
                lastName: last_name,
                email,
                pass: hashedPass
            })

            res.status(201).json({
                message: 'User created successfully'
            })
        } catch(err){
            console.error('Sign up error:', err)
            next(err)
        }
    }
]