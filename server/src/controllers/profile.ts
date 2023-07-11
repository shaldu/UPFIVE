import { Request, Response } from "express";
import { PrismaClient, Privacy } from '@prisma/client';

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
        
        //TODO: check if user is private and if the requester is friends with the user or not and return the appropriate data
        res.json({username, profile: {...user.profile, updatedAt: undefined}  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

export { getProfile };