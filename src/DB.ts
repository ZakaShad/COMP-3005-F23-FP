import { Pool } from 'pg';
var fs = require('fs');

// const DB = new Pool({
//     user: process.env.DB_USER, //postgres 
//     password: process.env.DB_PASS,
//     host: 'localhost',
//     port: 5432, // default Postgres port
//     database: process.env.DB_NAME //FP 
// });

const DB = new Pool({
    user: 'postgres', //postgres 
    password: String(fs.readFileSync('myPass.txt')),
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'FP v2' //FP 
});

export default DB;