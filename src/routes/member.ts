import express, {Request, Response} from 'express';
import DB from '../DB';

const routerMem = express.Router();

routerMem.get("/:username", async (req,res) => { 
    const memberQuery = `SELECT * FROM Member WHERE username = '${req.params.username}' `
    // const PRsQuery = `SELECT workout_name, weight, reps FROM goal_pr WHERE member_username='${req.params.username}' `
    
    const routineQuery = `
    SELECT name FROM member_workout_routines NATURAL JOIN workout_routine
    WHERE member_username='${req.params.username}';
    `

    const scheduleQuery = `...` //TODO: Implement
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

export default routerMem;