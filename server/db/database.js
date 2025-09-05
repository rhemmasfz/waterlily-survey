const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'usersurvey'
});

async function query(sql, values){
    const [result] = await db.query(sql, values);
    return result;
}

async function execute(sql, values){
    const [result] = await db.execute(sql, values);
    return result;
}

async function close(){
    await db.end();
}

module.exports = {db, query, execute, close};