const {Router} = require('express')
const signupRouter = Router()

signupRouter.get('/', (req,res) => {
    res.send('Signup Page')
})

module.exports = signupRouter