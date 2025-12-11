require('dotenv').config()
const {Client} = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS circles (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    passcode VARCHAR(255) NOT NULL,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    text VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    circle_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_circles (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    circle_id INTEGER NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
    UNIQUE(user_id, circle_id)
)
`

async function main(){
    console.log('Creating tables...')
    
    const client = new Client({
        connectionString: process.env.PROD_DB,
        ssl: {
            rejectUnauthorized: false
        }
    })

    try {
        await client.connect()
        await client.query(SQL)

    } catch(err){
        console.error('Error:', err)
    } finally {
        await client.end()
        console.log('Done')
    }
}

main()