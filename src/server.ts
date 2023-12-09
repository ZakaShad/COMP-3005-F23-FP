import express, {Request, Response} from 'express';
import { Pool } from 'pg';
import { isNumeric } from './helpers';
import { PostReqBody, PutReqQuery } from './helpers';

const app = express();
const bodyParser = require('body-parser');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const PORT = 3000;


//TODO: This needs to be a cloud server
const pool = new Pool({
  user: process.env.DB_USER, //postgres by default
  password: process.env.DB_PASS,
  host: 'localhost',
  port: 5432, // default Postgres port
  database: process.env.DB_NAME //A4 for me
});

const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: 'cb84ebb8dc8875c545009fa1ea4ba3011adceeb23a320a8e69892515549244e6',
    baseURL: 'http://localhost:3000/',
    clientID: 'rWLvIA4RdMcAS7Ua2F1jtyTGyWSdVgtX',
    issuerBaseURL: 'https://dev-l8qnenubc7x1j6bb.us.auth0.com'
}

// Init middleware
app.use(auth(authConfig));
app.use(bodyParser.json());
// TODO: Add custom middleware 


app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/member', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.post('/user', (req, res) => {
    console.log("ASDFASDFASD");
    console.log(req.body);
    res.send("ok");
})

app.get('/ping', (req, res) => {
    console.log("PING");
    res.send("ok");
})

app.get('/login', (req, res) => {
    console.log("ASDFADFASDF");
    res.send("ok");
})

// app.get('/login', (req, res) => {
//     console.log(req.body);
//     res.send("ok");
// })

/*
// Retrieves all students
application.get("/student", async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

// Add a student. Requires a body that must match PostReqBody schema in helpers.
application.post("/student", async(req: Request, res: Response) => {
    // Enforce that req.body follows the PostReqBody schema in helpers
    try{
        const reqBody = PostReqBody.check(req.body); //throws an excpetion if the check fails

        try {
            const query = `
            INSERT INTO students(first_name, last_name, email, enrollment_date) 
            VALUES
            ('${reqBody.first_name}', '${reqBody.last_name}', '${reqBody.email}', '${reqBody.enrollment_date}');
            `
    
            await pool.query(query);
            res.json("Successfully added student!");
        } catch (err) {
            if(err.code === '23505'){
                res.status(400).send(`Another student already has email ${reqBody.email}`);
                return;
            }
            console.error(err);
            res.status(500).send('Internal Server Error');
        }

    } catch(err){
        console.error(err);
        res.status(400).send("Request body is invalid!");
        return;
    }
});


// Edit a current student's email. Requires two URL PARAMS: id and email.
application.put("/student", async (req: Request, res: Response) => {
    try{
        const reqQuery = PutReqQuery.check(req.query); //Ensure that query params include id and email, both should be strings
        // id needs to be numeric
        if(!isNumeric(req.query.id)){
            res.status(400).send(`ID needs to be numeric!`);
            return;
        }

        try {
            const idQuery = `
            SELECT *
            FROM Students
            WHERE student_id = ${reqQuery.id}
            LIMIT 1;
            `
            const idRes = await pool.query(idQuery);
            if(idRes.rowCount != 1){
                res.status(400).send(`Could not find a user with this ID`);
                return;
            }

            const query = `
            UPDATE Students
            SET email = '${reqQuery.email}'
            WHERE student_id = ${reqQuery.id}
            ;
            `
    
            await pool.query(query);
            res.json("Updated student email");
        } catch (err) {
            if(err.code === '23505'){
                res.status(400).send(`Another student already has that email!`);
                return;
            }
            console.error(err);
            res.status(500).send('Internal Server Error');
        }


    } catch(err){
        console.log(err);
        res.status(400).send("Error in query request...");
    }
})

// delete the student with the matching student_id
application.delete("/student/:student_id", async (req: Request, res: Response) => {
    // student_id needs to be numeric
    if(!isNumeric(req.params.student_id)){
        res.status(400).send(`ID needs to be numeric!`);
        return;
    }

    try {
        const query = `
        DELETE FROM students 
        WHERE student_id = ${req.params.student_id};
        `

        const result = await pool.query(query);

        if(result.rowCount > 0){
            res.json(`Successfully deleted student!`);
        } 
        else{
            res.status(400).send(`Could not find student with ID ${req.params.student_id}.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

})
*/

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
})