import express, {Request, Response} from 'express';
const router = express.Router(); 
import DB from '../DB'; 


router.get("/", async (Request,Response) => {  

    const query = "SELECT * from event";
    const result = await DB.query(query);
    const data = result.rows; 

    Response.send({data}); 
}); 
router.post("/member", async (Request,Response) => {   


    const memU = Request.body.member_username; 
    const eventID = Request.body.event_id;
    const query = `INSERT INTO Member_Event_Registration VALUES ('${memU}', ${eventID})`;
    const result = await DB.query(query);
    const data = result.rows; 

    Response.send({data}); 
});  

router.delete("/member", async (Request,Response) => {   

    const memU = Request.body.member_username; 
    const eventID = Request.body.event_id;
    const query = `DELETE FROM Member_Event_Registration WHERE member_username = '${memU}' AND  event_id = ${eventID})`; 
    const result = await DB.query(query);
    const data = result.rows; 
    Response.send({data}); 


});

export default router;