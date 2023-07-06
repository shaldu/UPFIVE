import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
require('dotenv').config();
const jwt = require('jsonwebtoken');

let jwtToken = jwt.sign({}, process.env.JWT_SECRET);
const app = express();
const port = process.env.PORT || 4000;
const origins = process.env.ORIGINS?.split(',') || ['http://localhost:19006'];

// JWT verification middleware
function authenticateToken(req: Request, res: Response, next: NextFunction) {
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

const serverBoot = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/api', authenticateToken, (req, res) => {
        res.json({
            message: 'Welcome to the API'
        });
    });

    app.listen(port, () => {
        console.log(`🚀 Express running on http://localhost:${port}`);
    });

};

serverBoot();