import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verfityToken = (req,res,next) =>{
    console.log(req.cookies.access_token);
    const token = req.cookies.access_token;
     
    if(!token) return next(errorHandler(401, 'Unauhtorized'));

    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(401, 'Forbidden'));
        req.user = user;
        next();
    })

};