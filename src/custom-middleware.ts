import DB from './global-data';
import { userInDb } from './helpers';

/*
A middlware function that links SSO auth w/ our system's auth
Essentially, this intercepts all requests to check if a user is logged in.
    If they are, then this function checks if the user has a matching email in the DB.
        If so, then continue the middleware chain
        If not, then we add the user to our system. To do so, we need to ask some extra details:
            Name
            Birthday
            etc
*/
const validateUser = async(req, res, next ) => {
    // Prevent infinite redirection
    const excludedRoutes = ['/register'];

    // Skip if req.path is in excludedRoutes
    if (excludedRoutes.includes(req.path)) {
        console.log("detected exluded route. Continuing chain")
        next();
        return;
    }

    // User is not logged in
    if(!req.oidc.user){
        next();
        return;
    }

    // User is logged in 
    const email = req.oidc.user.email; 

    // If the user exists in DB, move on
    if(await userInDb(email)){
        console.log("User exists in DB. Moving on")
        next();
        return;
    }
    
    // User is logged in but not registered. We need to register them.
    res.redirect('/register');
};

module.exports = validateUser;