require('dotenv').config()
const pool = require('./pool')
const bcrypt = require('bcryptjs')

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

async function getCirclesByID(circleID){
    const {rows} = await pool.query(
        `SELECT c.*, u.first_name, u.last_name
        FROM circles AS c
        LEFT JOIN users AS u ON c.created_by = u.id
        WHERE c.id = $1
        `, [circleID]
    )

    return rows[0]
}

async function getUserCircles(id){
    const {rows} = await pool.query(
        `SELECT c.id, c.name, c.description, c.created_by, c.created_at, uc.joined_at,
        u.first_name, u.last_name
        FROM circles AS c
        JOIN user_circles AS uc ON c.id = uc.circle_id
        LEFT JOIN users AS u ON c.created_by = u.id
        WHERE uc.user_id = $1
        ORDER BY uc.joined_at DESC
        `, [id]
    )

    return rows
}

async function createCircle({id, name, description, passcode}){
    const client = await pool.connect()
    
    try {
        await client.query('BEGIN')

        const hashedPass = await bcrypt.hash(passcode, 10)

        const newCircle = await client.query(
            `INSERT INTO circles (name, description, passcode, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, description, created_at
            `, [name, description, hashedPass, id]
        )

        const circleID = newCircle.rows[0].id

        await client.query(
            `INSERT INTO user_circles (user_id, circle_id)
            VALUES ($1, $2)
            `, [id, circleID]
        )

        await client.query('COMMIT')
        return newCircle.rows[0]
    } catch(err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

async function checkCirclePass({id, passcode}){
    const {rows} = await pool.query(
        `SELECT id, name, description, passcode
        FROM circles
        WHERE id = $1
        `, [id]
    )

    if (rows.length === 0){
        return null
    }

    const circle = rows[0]
    const isMatch = await bcrypt.compare(passcode, circle.passcode)

    return isMatch ? {
        id: circle.id,
        name: circle.name,
        description: circle.description
    } : null
}

async function alreadyInCircle({userID, circleID}){
    const {rows} = await pool.query(
        `SELECT id FROM user_circles
        WHERE user_id = $1 AND circle_id = $2
        `, [userID, circleID]
    )

    return rows.length > 0
}

async function joinCircle({userID, circleID}){
    const client = await pool.connect()
    
    try {
        await client.query('BEGIN')

        const alreadyMember = await alreadyInCircle({userID, circleID})

        if (alreadyMember){
            await client.query('ROLLBACK')
            return {
                success: false,
                message: 'You are already a member of this circle'
            }
        }

        const result =  await client.query(
            `INSERT INTO user_circles (user_id, circle_id)
            VALUES ($1, $2)
            RETURNING id, joined_at
            `, [userID, circleID]
        )

        const info = await client.query(
            `SELECT id, name, description
            FROM circles
            WHERE id = $1
            `, [circleID]
        )

        await client.query('COMMIT')

        return {
            success: true,
            circle: info.rows[0],
            joined_at: result.rows[0].joined_at
        }
    } catch(err){
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

async function getCircleByName(name){
    const {rows} = await pool.query(
        `SELECT id, name, description, created_by, created_at
        FROM circles
        WHERE LOWER(name) = LOWER($1)
        `, [name]
    )

    return rows[0]
}

module.exports = {
    checkEmail,
    createUser,
    getUser,
    getUserByID,
    getCirclesByID,
    getUserCircles,
    createCircle,
    checkCirclePass,
    getCirclesByID,
    joinCircle,
    getCircleByName
}