import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authenticateToken from './middleware/auth';
import userRoutes from './routes/user';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const serverBoot = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/users', userRoutes);

    app.listen(port, () => {
        console.log(`🚀 Express running on http://localhost:${port}`);
    });

};

serverBoot();