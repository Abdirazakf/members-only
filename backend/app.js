require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')

const app = express()

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

if (process.env.NODE_ENV === 'prod'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}

app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ 
        errors: [{ msg: 'Something went wrong on the server' }] 
    })
})

app.listen(process.env.PORT, (err) => {
    if (err){
        console.log(err)
    }

    console.log("App is running is port", process.env.PORT)
})