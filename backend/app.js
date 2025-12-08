require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/login', loginRouter)
app.use('/sign-up', signupRouter)

if (process.env.NODE_ENV === 'prod'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}

app.listen(process.env.PORT, (err) => {
    if (err){
        console.log(err)
    }

    console.log("App is running is port", process.env.PORT)
})