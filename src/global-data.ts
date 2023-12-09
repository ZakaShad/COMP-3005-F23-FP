import { Pool } from 'pg';

const DB = new Pool({
    user: 'postgres', //postgres by default
    // user: process.env.DB_USER, //postgres by default
    // password: process.env.DB_PASS,
    password: 'mario200',
    host: 'localhost',
    port: 5432, // default Postgres port
    // database: process.env.DB_NAME //A4 for me
    database: 'FP' //A4 for me
});

export default DB;