import express, { NextFunction, Request, Response } from 'express';
import { isTokenAuth } from "./auth";

const jwt = require('jsonwebtoken');
require('dotenv').config();

const origins = process.env.ORIGINS?.split(',') || ['http://localhost:19006'];
let jwtToken = jwt.sign({}, process.env.JWT_SECRET);


export default async function authUser(req: Request, res: Response, next: NextFunction) {
    if (await isTokenAuth(req)) {
        //TODO: check if the user is authenticated to read the data
        
        next();
        return;
    }

    
    return res.sendStatus(403);
}