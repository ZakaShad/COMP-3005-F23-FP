import express, {Request, Response} from 'express';
const routerHis = express.Router();

routerHis.get("/", (Request,Response) => { 

    Response.send({data: "test history"}); 
});

export default routerHis;