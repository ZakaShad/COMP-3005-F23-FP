import express, {Request, Response} from 'express';
import { userInDb } from './helpers';
import { PostReqBody, PutReqQuery } from './helpers';
import DB from './global-data';

const app = express();
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');
const validateUser = require('./custom-middleware');
const axios = require("axios").default;

const PORT = 3000;

// import DB from './global-data';
// async function test(){
//     const query = `SELECT email FROM Users WHERE email='asdfasdfasdf' LIMIT 1;`
//     const result = await DB.query(query).then();
//     console.log(result.rows);
// }

// test();

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validateUser);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/member', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/register', requiresAuth(), async(req, res) => {
    if(await userInDb(req.oidc.user.email)){
        res.send("you're already registered!");
        return;
    }
    res.render('register');
})

app.post('/register', async(req, res) => {
    const username = req.oidc.user.email;
    const passwd = '...';
    const email = req.oidc.user.email;
    const rDate = '2023-01-01 00:00:00';
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const dob = req.body.dob;
    
    const query = `
    INSERT INTO Users
    VALUES ('${username}', '${passwd}', '${email}', '${rDate}', '${fname}', '${lname}', '${dob}' );
    `
    
    try{
        const result = await DB.query(query);
        res.redirect("/");
    } catch(err){
        if(err.code === 23505){
            res.send("Seems like you've already registered.");
            return;
        }
    }

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