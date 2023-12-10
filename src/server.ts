import express, {Request, Response} from 'express';
import { Pool } from 'pg';
import { isNumeric } from './helpers';
import { PostReqBody, PutReqQuery } from './helpers';
import eventRouter from './routes/event';  
import exerRouter from './routes/exercise';
import histroyRouter from './routes/history';  
import memRouter from './routes/member';  
import routRouter from './routes/routine';  
import routSession from './routes/session';  
import routStaff from './routes/staff'; 
import routTrain from './routes/trainer';  
 
const application = express();
const bodyParser = require('body-parser');
application.use(bodyParser.json());
const PORT = 1337;

//TODO: This needs to be a cloud server
const pool = new Pool({
  user: process.env.DB_USER, //postgres by default
  password: process.env.DB_PASS,
  host: 'localhost',
  port: 5432, // default Postgres port
  database: process.env.DB_NAME //A4 for me
});

application.use('/event',eventRouter); 
application.use('/exercise',exerRouter); 
application.use('/history',histroyRouter);
application.use('/member',memRouter);
application.use('/routine',routRouter); 
application.use('/session',routSession); 
application.use('/staff',routStaff); 
application.use('/event',routTrain); 

//making the route directories  
//const events = require ('./routes/events');   
/*
const excersie = require ('/routes/excersie.ts');  
const histroy = require ('src/routes/histroy.ts');  
const member = require('src/routes/member.ts'); 
const routine = require('src/routes/session.ts'); 
const staff = require('src/routes/staff.ts');  
const trainer = require('src/trainer/staff.ts');  
*/


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

application.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
})
*/ 
application.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`); 

})