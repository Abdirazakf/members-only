const {Router} = require('express')
const authRouter = Router()
const {checkAuth, logoutUser} = require('../controllers/authController')

authRouter.get('/status', checkAuth)
authRouter.post('/logout', logoutUser)

module.exports = authRouter