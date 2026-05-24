import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_Host,
    user: process.env.DB_USER,
    password: process.env.DB_Password,
    database: process.env.DB_Name,
    port: process.env.DB_Port,
    waitForConnections: true,
    connectionLimit: 10
});

pool.getConnection().then((connection)=>{
    console.log('todo bien');
    connection.release();
})
.catch((error)=>{
    console.error('todo mal ', error.message);
})

export default pool;