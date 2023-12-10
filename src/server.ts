import express, {Request, Response} from 'express';
import { userInDb } from './helpers';
import { PostReqBody, PutReqQuery } from './helpers';
import DB from './DB';

import eventRouter from './routes/event';  
import exerRouter from './routes/exercise';
import histroyRouter from './routes/history';  
import memRouter from './routes/member';  
import routRouter from './routes/routine';  
import routSession from './routes/session';  
import routStaff from './routes/staff'; 
import routTrain from './routes/trainer';  
const app = express();
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');
const validateUser = require('./custom-middleware');

const PORT = 3000;

// Required config for Auth0
const authConfig = {
    authRequired: true,
    auth0Logout: true,
    secret: 'cb84ebb8dc8875c545009fa1ea4ba3011adceeb23a320a8e69892515549244e6',
    baseURL: 'http://localhost:3000/',
    clientID: 'rWLvIA4RdMcAS7Ua2F1jtyTGyWSdVgtX',
    issuerBaseURL: 'https://dev-l8qnenubc7x1j6bb.us.auth0.com'
}

// Init middleware
app.use(auth(authConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validateUser);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up routes
app.use('/event',eventRouter); 
app.use('/exercise',exerRouter); 
app.use('/history',histroyRouter);
app.use('/member',memRouter);
app.use('/routine',routRouter); 
app.use('/session',routSession); 
app.use('/staff',routStaff); 
app.use('/train',routTrain); 

app.get('/', async (req, res) => {
    const email = req.oidc.user.email;
    const query = `SELECT u_type FROM Users WHERE username = '${email}'`
    
    try{
        const result = await DB.query(query);
        const userType = result.rows[0].u_type;
        res.redirect(`/${userType}/${email}`);
    }catch(err){
        console.log(err);
        res.send("internal server error");
        return;
    }
    
    // console.log(`/${userType}/${email}`);
    // res.send(`/${userType}/${email}`);
    // res.send('nice');
});


app.get('/register', requiresAuth(), async(req, res) => {
    if(await userInDb(req.oidc.user.email)){
        res.send("you're already registered!");
        return;
    }
    res.render('register');
})

app.post('/register', async(req, res) => {
    const username = req.oidc.user.email;
    const passwd = '...';
    const email = req.oidc.user.email;
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const dob = req.body.dob;
    const userType = req.body.userType;
    
    const usersQuery = `
    INSERT INTO Users
    VALUES ('${username}', '${passwd}', '${email}', '${dob}', '${fname}', '${lname}', '${dob}', '${userType}' );
    `

    var subQuery;
    if(req.body.userType === 'member'){
        const {height, weight, RHR, MHR, desiredWeight} = req.body;

        subQuery = `
        INSERT INTO Member
        VALUES ('${username}', ${height}, ${weight}, ${RHR}, ${MHR}, ${desiredWeight}, 'Bronze', 10);
        `
    }

    if(req.body.userType === 'trainer'){
        const staffId = req.body.staffId;
        // TODO: verify staffId here

        subQuery = `
        INSERT INTO Trainer
        VALUES ('${req.oidc.user.email}')
        `
    }

    if(req.body.userType === 'admin'){
        const staffId = req.body.staffId;
        // TODO: verify staffId here

        subQuery = `
        INSERT INTO Admin
        VALUES ('${req.oidc.user.email}')
        `
    }
    
    try{
        const query = usersQuery + subQuery;
        await DB.query(query);
    } catch(err){
        if(err.code === 23505){
            console.log("detected duplicated registration");
            res.send("Seems like you've already registered.");
            return;
        }
    }

    res.redirect("/");
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
})