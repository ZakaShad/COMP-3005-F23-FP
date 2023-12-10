import express, {Request, Response} from 'express';
const router = express.Router();

router.get("/", (Request,Response) => {  
    console.log("List out events reached")

    Response.send({data: "test event"}); 
});

//module.exports = router; 
export default router;