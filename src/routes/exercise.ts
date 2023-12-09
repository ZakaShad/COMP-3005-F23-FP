import express, {Request, Response} from 'express';
const routerExc = express.Router();

routerExc.get("/", (Request,Response) => { 

    Response.send({data: "test event"}); 
});

export default routerExc;