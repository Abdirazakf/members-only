require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')

const app = express()
const PORT = process.env.PORT

console.log('Starting server...')
console.log('Environment:', process.env.NODE_ENV)
console.log('Port:', PORT)
console.log('Database URL exists:', process.env.DATABASE_URL)

app.use(cors({
    origin: process.env.NODE_ENV === 'prod' 
        ? 'https://members-only-production-7933.up.railway.app'
        : 'http://localhost:5173',
    credentials: true
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/sign-up', signupRouter)

app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ 
        errors: [{ msg: 'Something went wrong on the server' }] 
    })
})

app.listen(PORT, (err) => {
    if (err){
        console.log(err)
    }

    console.log("App is running is port", process.env.PORT)
})