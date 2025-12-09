const { Router } = require('express')
const { authenticateUser } = require('../controllers/loginController')
const loginRouter = Router()

loginRouter.post('/', authenticateUser)

module.exports = loginRouter