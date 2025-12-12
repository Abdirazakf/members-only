const {Router} = require('express')
const messageRouter = Router()
const {createMessage, getMessages} = require('../controllers/messageController')

messageRouter.post('/create', createMessage)
messageRouter.get('/circle/:circleId', getMessages)

module.exports = messageRouter