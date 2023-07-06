import express, { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const origins = process.env.ORIGINS?.split(',') || ['http://localhost:19006'];
let jwtToken = jwt.sign({}, process.env.JWT_SECRET);


// JWT verification middleware
export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }
    
    const headers = req.headers;

    // Access specific header values
    const reqOrigin = req.headers['origin'] as string;
    const reqReferer = req.headers['referer'] as string;
    
    // Check if the origin is allowed
    if (!origins.includes(reqOrigin) && !origins.includes(reqReferer)) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: Error) => {
        
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        next();
    });
}

export async function isTokenAuth(req: Request){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return false; // Unauthorized
    }
    
    // Access specific header values
    const reqOrigin = req.headers['origin'] as string;
    const reqReferer = req.headers['referer'] as string;
    
    // Check if the origin is allowed
    if (!origins.includes(reqOrigin) && !origins.includes(reqReferer)) {
        return false;
    }
    
    const jwrsp = await jwt.verify(token, process.env.JWT_SECRET, (err: Error) => {return err});
    if (jwrsp != null){
        return false;
    }
    
    return true;
}
