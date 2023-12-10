import { Pool } from 'pg';

const DB = new Pool({
    user: process.env.DB_USER, //postgres 
    password: process.env.DB_PASS,
    host: 'localhost',
    port: 5432, // default Postgres port
    database: process.env.DB_NAME //FP 
});

export default DB;