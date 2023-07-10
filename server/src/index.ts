import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authenticateToken from './middleware/auth';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const serverBoot = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/users', userRoutes);
    app.use('/api/profile', profileRoutes);

    app.listen(port, () => {
        console.log(`🚀 Express running on http://localhost:${port}`);
    });

};

serverBoot();