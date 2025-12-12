const db = require('../db/queries')
const {body, validationResult, matchedData} = require('express-validator')

const titleErr = 'Title must be between 2 and 100 chars'
const messageErr = 'Message must be between 1 and 255 chars'

const validateMessage = [
    body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({min: 2, max: 100}).withMessage(titleErr),
    body('message').trim().notEmpty().withMessage('Message is required')
    .isLength({min: 1, max: 255}).withMessage(messageErr)
]

exports.createMessage = [
    validateMessage,
    async (req, res, next) => {
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
                    message: 'You must be logged in to create messages'
                })
            }

            const {title, message, circle_id} = matchedData(req)

            const result = await db.createMessage({
                userID: req.user.id,
                circleID: circle_id,
                title: title,
                text: message
            })

            if (!result.success){
                return res.status(403).json({
                    success: false,
                    message: result.message
                })
            }

            res.status(201).json({
                success: true,
                message: 'Message created successfully',
                data: result.message
            })
        } catch(err){
            console.error('Create message error:', err)
            next(err)
        }
    }
]

exports.getMessages = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()){
            return res.status(401).json({
                success: false,
                message: 'You must be logged in to view messages'
            })
        }

        const {circleId} = req.params

        if (!circleId){
            return res.status(400).json({
                success: false,
                message: 'Circle ID is required'
            })
        }

        const isMember = await db.alreadyInCircle({
            userID: req.user.id,
            circleID: parseInt(circleID)
        })

        if (!isMember){
            return res.status(403).json({
                success: false,
                message: 'You must be a member of this circle to view messages'
            })
        }

        const messages = await db.getCircleMessages(parseInt(circleID))

        res.json({
            success: true,
            messages: messages
        })
    } catch(err){
        console.error('Get messages error:', err)
        next(err)
    }
}