import { String, Record } from 'runtypes';
import DB from './DB';

export const PostReqBody = Record({
    first_name: String,
    last_name: String, 
    email: String,
    enrollment_date: String
});

export const PutReqQuery = Record({
    id: String,
    email: String
});

// Returns true if input string contains only numeric characters
export const isNumeric = (val: string) : boolean => {
    return !isNaN(Number(val));
}

export const userInDb = async(email: string) => {
    try{
        const query = `SELECT email FROM Users WHERE email='${email}' LIMIT 1;`
        const result = await DB.query(query);
        if(result.rows.length > 0){
            return true;
        }
    }catch(err){
        console.log(err);
    }
    return false;
}