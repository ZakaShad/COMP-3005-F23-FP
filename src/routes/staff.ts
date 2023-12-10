import express, {Request, Response} from 'express';
const routerStaff  = express.Router();

routerStaff.get("/", (Request,Response) => { 

    Response.send({data: "test staff"}); 
})

export default routerStaff;