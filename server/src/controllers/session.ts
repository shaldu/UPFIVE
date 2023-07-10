import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createSession = async (userId: string) => {
    const session = await prisma.session.create({
        data: {
            userId
        }
    });

    return session.id;
};

export {createSession}