import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createSession } from "./session";

const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ error: { status: 404, message: 'User not found' } });
        }

        const responseData = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        }

        res.json(responseData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req: Request, res: Response) => {
    const { email, username, password, confirmPassword } = req.body;

    //validate the data
    if (!email || !username || !password || !confirmPassword) {
        return res.status(400).json({ error: { status: 403, message: 'Please fill all required fields' }, data: { email, username } });
    }

    //check if empty
    if (email.trim() === '' || username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        return res.status(400).json({ error: { status: 403, message: 'Please fill all required fields' }, data: { email, username } });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: { status: 403, message: 'Password must be at least 6 characters long' }, data: { email, username } });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: { status: 403, message: 'Passwords do not match' }, data: { email, username } });
    }

    if (username.length < 4) {
        return res.status(400).json({ error: { status: 403, message: 'Username must be at least 4 characters long' }, data: { email, username } });
    }

    //check if user email or username already exists
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        return res.status(400).json({ error: { status: 403, message: 'User with this email already exists' }, data: { email, username } });
    }

    const user2 = await prisma.user.findUnique({
        where: { username },
    });

    if (user2) {
        return res.status(400).json({ error: { status: 403, message: 'User with this username already exists' }, data: { email, username } });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        let newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,

            },
        });

        //TODO: create session for the user
        const sessionId = await createSession(newUser.id);
        
        res.json({status: 200, newUser, sessionId}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                username,
                email,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { getUser, createUser, updateUser, deleteUser, getUsers };