import express, {Request, Response} from 'express';
import { userInDb } from './helpers';
import { PostReqBody, PutReqQuery } from './helpers';
import DB from './global-data';

import eventRouter from './routes/event';  
import exerRouter from './routes/exercise';
import histroyRouter from './routes/history';  
import memRouter from './routes/member';  
import routRouter from './routes/routine';  
import routSession from './routes/session';  
import routStaff from './routes/staff'; 
import routTrain from './routes/trainer';  
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');
const validateUser = require('./custom-middleware');
const axios = require("axios").default;

const PORT = 3000;

// Required config for Auth0
const authConfig = {
    authRequired: false,
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

// Essential routes here 
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// app.get('/member', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });

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
    const rDate = '2023-01-01 00:00:00';
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const dob = req.body.dob;
    
    const query = `
    INSERT INTO Users
    VALUES ('${username}', '${passwd}', '${email}', '${rDate}', '${fname}', '${lname}', '${dob}' );
    `
    
    try{
        const result = await DB.query(query);
        res.redirect("/");
    } catch(err){
        if(err.code === 23505){
            res.send("Seems like you've already registered.");
            return;
        }
    }

})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
})