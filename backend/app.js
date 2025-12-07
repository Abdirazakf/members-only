require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.PORT, (err) => {
    if (err){
        console.log(err)
    }

    console.log("App is running")
})