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
            RETURNING id, email, first_name, last_name`
            ,[email,pass,firstName,lastName]
        )

        await client.query('COMMIT')
        return newUser.rows[0]
    } catch(err){
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

async function getUser(username) {
    const {rows} = await pool.query(
        `SELECT * FROM users WHERE email = $1`, [username]
    )

    return rows[0]
}

async function getUserByID(id) {
    const {rows} = await pool.query(
        `SELECT * FROM users WHERE id = $1`, [id]
    )

    return rows[0]
}

module.exports = {
    checkEmail,
    createUser,
    getUser,
    getUserByID
}