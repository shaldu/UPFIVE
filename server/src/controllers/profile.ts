import { Request, Response } from "express";
import { PrismaClient, Privacy } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createSession } from "./session";

const prisma = new PrismaClient();

const getProfile = async (req: Request, res: Response) => {
    const { username } = req.params;
    
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: { profile: true }
        });
        
        if (!user) {
            return res.status(404).json({ error: { status: 404, message: 'User not found' } });
        }
        
        res.json({username, profile: user.profile});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

export { getProfile };