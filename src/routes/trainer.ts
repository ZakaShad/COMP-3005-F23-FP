import express, {Request, Response} from 'express';
const routerTrain = express.Router();

routerTrain.get("/", (Request,Response) => { 

    Response.send({data: "test event"}); 
});

export default routerTrain;