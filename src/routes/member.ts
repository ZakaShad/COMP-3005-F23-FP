import express, {Request, Response} from 'express';
import DB from '../DB';

const routerMem = express.Router();

routerMem.get("/:username", async (req,res) => { 
    const memberQuery = `SELECT * FROM Member WHERE email = '${req.params.username}' `
    // const PRsQuery = `SELECT workout_name, weight, reps FROM goal_pr WHERE member_username='${req.params.username}' `
    
    const routineQuery = `
    SELECT name FROM member_workout_routine NATURAL JOIN workout_routine
    WHERE member='${req.params.username}';
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


export default routerMem;