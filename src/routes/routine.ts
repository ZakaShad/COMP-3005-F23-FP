import express, {Request, Response} from 'express';
const routerRoutine = express.Router()  

routerRoutine.get("/", (Request,Response) => { 

    Response.send({data: "test event"}); 
});

export default routerRoutine;