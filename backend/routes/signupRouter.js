const {Router} = require('express')
const { checkValidUserPost } = require('../controllers/signupController')
const signupRouter = Router()

signupRouter.post('/', checkValidUserPost)

module.exports = signupRouter