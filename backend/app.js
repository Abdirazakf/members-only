require('dotenv').config()
const express = require('express')
const session = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const cors = require('cors')
const path = require('path')
const passport = require('./config/passport')

const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')
const authRouter = require('./routes/authRouter')
const circleRouter = require('./routes/circleRouter')
const messageRouter = require("./routes/messageRouter")

const app = express()
const PORT = process.env.PORT || 3000

// Trust Railway's proxy
if (process.env.NODE_ENV === 'prod') {
    app.set('trust proxy', 1)
}

const connectionString = process.env.DATABASE_URL || process.env.DB_STRING

const pool = new pg.Pool({
    connectionString: connectionString
})

const sessionStore = new pgSession({
    pool: pool,
    tableName: 'session',
    createTableIfMissing: true,
})

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'prod',
        httpOnly: true,
        sameSite: 'lax'
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/sign-up', signupRouter)
app.use('/api/auth', authRouter)
app.use('/api/circle', circleRouter)
app.use('/api/message', messageRouter)

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

app.listen(PORT, (err) => {
    if (err){
        console.log(err)
    }

    console.log("App is running is port", process.env.PORT)
})