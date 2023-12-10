import express, {Request, Response} from 'express';
const routerSess = express.Router();

routerSess.get("/", (Request,Response) => { 

    Response.send({data: "test event"}); 
});

export default routerSess;