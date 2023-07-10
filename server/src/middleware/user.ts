import express, { NextFunction, Request, Response } from 'express';
import { isTokenAuth } from "./auth";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Checks if the user is authenticated to read the data
 * The User needs a valid session / logged in, and the given API token must be valid
 */
export default async function authUser(req: Request, res: Response, next: NextFunction) {
    if (await isTokenAuth(req)) {
        //TODO: check if the user is authenticated to read the data
        const sessionId = req.headers['sessionid'];
        if (sessionId !== null || sessionId !== '') {
            //TODO: check if the session is valid
            const session = await prisma.session.findUnique({
                where: { id: sessionId as string },
                include: { user: true }
            });
            if (session !== null) {
                //check created at if less than 30 days
                const createdAt = session.createdAt;
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - createdAt.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays < 30) {
                    next();
                    return;
                }
                //we have a session but it is expired or invalid
                return res.json({ error: { status: 440, message: 'Session expired' } });
            }

            //we have a token but no session
            return res.sendStatus(401);
        }

        //we have a token but no session
        return res.sendStatus(401);
    }


    return res.sendStatus(403);
}