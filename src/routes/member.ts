import express, {Request, Response} from 'express';
import DB from '../DB';

const routerMem = express.Router();

routerMem.get("/:username", async (req,res) => { 
    const memberQuery = `SELECT * FROM Member WHERE email = '${req.params.username}' `
    
    const routineQuery = `
    SELECT * FROM member_workout_routine, workout_routine
    WHERE member='${req.params.username}'
    AND routine=routine_id;
    `

    try{
        const result = await DB.query(memberQuery);
        const memberData = result.rows[0];

        const routineRes = await DB.query(routineQuery);
        memberData['routines'] = routineRes.rows.map(r => r.name); 

        res.render('memberPage', memberData); 
    }catch(err){
        console.log(err);
        res.send("internal server error");
    }
});

routerMem.get("/:username/goal", async (req,res) => { 
    try{
        const query = `
        SELECT workout, weight, reps FROM goal_prs WHERE member='${req.params.username}'; 
        `
        const result = await DB.query(query);
        const pr_data = result.rows;
        res.render('memberPrs', {pr_data});
    }catch(err){
        console.log(err);
        res.send("Internal server error");
    }

});

routerMem.get("/:username/editProfile", async (req,res) => { 
    const memberQuery = `SELECT * FROM Member WHERE email = '${req.params.username}' `
    try{
        const result = await DB.query(memberQuery);
        const memberData = result.rows[0];
        res.render('updateMember', memberData);
    }catch(err){
        console.log(err);
        res.send("internal server error");
    }

});

// routerMem.post("/toPut", (req, res) => {

// })

// This is really bad design as post should be used for adding to DB
routerMem.post("/edit", async(req, res) => {
    console.log("ASDFASDFASDF");
    const email = req.oidc.user.email;
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const dob = req.body.dob;
    const {height, weight, RHR, MHR, desiredWeight} = req.body;
    
    const usersQuery = `
    UPDATE User
    SET first_name='${fname}', last_name='${lname}', birthday='${dob}'
    INSERT INTO Users (email, first_name, last_name, registration_date, birthday, type);
    `

    const subQuery = `
    UPDATE Member 
    SET desired_weight=${desiredWeight}, height=${height}, weight=${weight}, rhr=${RHR}, mh=${MHR}
    WHERE email='${email}';
    `

    try{
        const query = usersQuery + subQuery;
        await DB.query(query);
    } catch(err){
        console.log(err);
        res.send("Internal server error");
    }

    res.redirect("/");
});

routerMem.get("/:email/schedule", async(req, res) => {
    const query = `
    SELECT * FROM event, member_event_registration AS mer
    WHERE event.event_id = mer.event
    AND
    mer.member = '${req.params.email}'
    `

    const sessionQuery = `
    SELECT * FROM training_session
    WHERE member = '${req.params.email}'
    `

    try{
        const eventResults = await DB.query(query);
        const events = eventResults.rows;

        const sessionRes = await DB.query(sessionQuery);
        const sessions = sessionRes.rows;
        res.render('memberSched', {events, sessions});
    }catch(err){
        console.log(err);
        res.send("internal server error");
    }
});

export default routerMem;