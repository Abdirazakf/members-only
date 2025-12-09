require('dotenv').config()
const express = require('express')
const session = require('express-session')
const pg = require('pg')
const cors = require('cors')
const passport = require('./config/passport')

const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')

const app = express()
const PORT = process.env.PORT

const connectionString = process.env.DATABASE_URL || process.env.DB_STRING

const pool = new pg.Pool({
    connectionString: connectionString
})

const sessionStore = new pgSession({
    pool: pool,
    tableName: 'session'
})

app.use(cors({
    origin: process.env.NODE_ENV === 'prod' 
        ? 'https://members-only-production-7933.up.railway.app'
        : 'http://localhost:5173',
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Members Only API' })
})

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