const {Router} = require('express')
const loginRouter = Router()

loginRouter.get('/', (req, res) => {
    res.send('Login Page')
})

module.exports = loginRouter