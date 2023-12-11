import express, {Request, Response} from 'express';
const routerSess = express.Router();
import DB from '../DB'; 

 
routerSess.get("/", async(Request,Response) => {  

    const query = "SELECT * From Training_Session";
    const result = await DB.query(query);
    const data = result.rows;

    Response.send(data); 
});  

routerSess.post("/member", async(Request,Response) => {   

    const memberIn = Request.body.member; 
    const id = Request.body.traningSessId;

    const query = `INSERT INTO Trained_In VALUES ('${memberIn}',${id} ;`;  

    const result = await DB.query(query);
    const data = result.rows;

    Response.send(data); 
});   

routerSess.delete("/member", async (Request,Response) => {  

    const memberIn = Request.body.member; 
    const id = Request.body.traningSessId; 

    const query = `DELETE FROM Trained_in WHERE member_username = '${memberIn}' AND training_session_id = ${id};`;   

    const result = await DB.query(query);
    const data = result.rows;

    Response.send(data); 
    


}); 


routerSess.put("/:id", async(Request,Response) => {   

    const id = Request.body.training_session_id; 
    const training_notesIN = Request.body.training_notes;

    const query = `UPDATE Training_Session SET training_notes = '${training_notesIN}' WHERE training_session_id = ${id};`; 

    const result = await DB.query(query);
    const data = result.rows;

    Response.send(data); 
});   

export default routerSess;