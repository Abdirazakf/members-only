require('dotenv').config()
const {Pool} = require('pg')

const connectionString = process.env.DATABASE_URL || process.env.DB_STRING

module.exports = new Pool({
    connectionString: connectionString,
    ssl: process.env.DATABASE_URL ? {
        rejectUnauthorized: false
    } : false,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
})