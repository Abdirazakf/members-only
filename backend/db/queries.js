require('dotenv').config()
const pool = require('./pool')

async function checkEmail(email){
    const {rows} = await pool.query(`
        SELECT u.email FROM users as u
        WHERE u.email = $1
        `, [email])
    
    return rows[0]
}

async function createUser({firstName, lastName, email, pass}){
    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        const newUser = await client.query(
            `INSERT INTO users (email, password, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,[email,pass,firstName,lastName]
        )

        return newUser
    } catch(err){
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

module.exports = {
    checkEmail,
    createUser
}