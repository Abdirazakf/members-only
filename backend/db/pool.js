require('dotenv').config()
const {Pool} = require('pg')

module.exports = new Pool({
    connectionString: process.env.NODE_ENV === 'prod' ? process.env.PROD_DB : process.env.DB_STRING,
    ssl: {
        rejectUnauthorized: false,
        sslmode: 'require'
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
})