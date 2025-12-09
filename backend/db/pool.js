require('dotenv').config()
const {Pool} = require('pg')

console.log('Environment Variables Check:')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('DB_STRING:', process.env.DB_STRING)
console.log('DATABASE_URL:', process.env.DATABASE_URL)

const connectionString = process.env.DATABASE_URL || process.env.DB_STRING

console.log('Database Configuration:')
console.log('Environment:', process.env.NODE_ENV)
console.log('Connection string exists:', !!connectionString)

if (!connectionString) {
    console.error('❌ ERROR: DATABASE_URL not found!')
    process.exit(1)
}

module.exports = new Pool({
    connectionString: connectionString,
    ssl: process.env.DATABASE_URL ? {
        rejectUnauthorized: false
    } : false,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
})