import express, {Request, Response} from 'express';
const routerMem = express.Router();

routerMem.get("/", (Request,Response) => { 

    Response.send({data: "test member"}); 
});

export default routerMem;