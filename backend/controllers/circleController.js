const db = require('../db/queries')
const {body, validationResult, matchedData} = require('express-validator')
const nameErr = 'Circle name has to be less than 101 chars'
const descErr = 'Description must be less than 256 chars'
const passErr = 'Passcode must be between 4 and 30 chars'

const validateCreateCircle = [
    body('circle_name').trim().notEmpty().withMessage('Circle name is required')
    .isLength({max: 101}).withMessage(nameErr),
    body('desc').optional().trim().isLength({max: 255})
    .withMessage(descErr),
    body('passcode').trim().notEmpty().withMessage('Passcode is required')
    .isLength({min: 4, max: 30}).withMessage(passErr)
]

exports.getUsersCircles = async(req, res, next) => {
    try {
        if (!req.isAuthenticated()){
            return res.status(401).json({
                success: false,
                message: 'You must be logged in to view circles'
            })
        }

        const circles = await db.getUserCircles(req.user.id)

        res.json({
            success: true,
            circles: circles
        })
    } catch(err){
        console.error('Error fetching circles:',err)
        next(err)
    }
}

exports.createCircle = [
    validateCreateCircle,
    async(req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        try {
            if (!req.isAuthenticated()){
                return res.status(401).json({
                    success: false,
                    message: 'You must be logged in to create a circle'
                })
            }

            const {circle_name, desc, passcode} = matchedData(req)

            const newCircle = await db.createCircle({
                id: req.user.id,
                name: circle_name,
                description: desc || null,
                passcode: passcode
            })

            res.status(201).json({
                success: true,
                message: 'Circle created successfully',
                circle: {
                    id: newCircle.id,
                    name: newCircle.name,
                    description: newCircle.description,
                    created_at: newCircle.created_at
                }
            })
        } catch(err) {
            console.error('Create circle error:', err)
            next(err)
        }
    }
]

exports.joinCircle = async(req, res, next) => {
    try {
        res.json({
            success: false,
            message: 'Join circle not implemented yet'
        })
    } catch(err) {
        console.error('Join circle error:', err)
        next(err)
    }
} 