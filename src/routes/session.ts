import express, {Request, Response} from 'express';
const routerSess = express.Router();
import DB from '../DB'; 

 
routerSess.get("/:username", async(Request,Response) => {  

    const user = Request.params.username; 

    const data = { 

        username: String(user), 
        test: 'test101'
    };
    console.log(user);
    Response.render('session.pug',data) 
});   

routerSess.get("/:username/cancel", async(Request,Response) => { 
    
    const user = Request.params.username;  
    const data = { 

        username: String(user), 
        test: 'test101'
    }; 
    Response.render('cancelSession.pug',data);

});


routerSess.post("/:username", async(Request,Response) => {   

    console.log(Request.body); 
    console.log(Request.params.username);  

    const start = Request.body.startDate + ' ' + Request.body.timeIn + ':00'; 
    const end  = Request.body.endDate + ' ' + Request.body.timeOut + ':00';  
    const idv = Number(3);

    
    const query = `INSERT INTO Training_Session VALUES
    (3,' ', '${start}', '${end}');`; 
    console.log(query) 
    const result = await DB.query(query); 
    const data = result.rows;

    console.log("YEAAAA MONNNN");
    Response.send("data"); 
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

routerSess.delete("/")
routerSess.put("/:id", async(Request,Response) => {   

    const id = Request.body.training_session_id; 
    const training_notesIN = Request.body.training_notes;

    const query = `UPDATE Training_Session SET training_notes = '${training_notesIN}' WHERE training_session_id = ${id};`; 

    const result = await DB.query(query);
    const data = result.rows;

    Response.send(data); 
});   

export default routerSess;