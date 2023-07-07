import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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