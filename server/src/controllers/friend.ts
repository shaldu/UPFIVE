import { Request, Response } from "express";
import { FriendRequestStatus, PrismaClient, Privacy } from '@prisma/client';

const prisma = new PrismaClient();

const sendFriendRequest = async (req: Request, res: Response) => {
    const { sentProfileId, receiveProfileId } = req.body;

    if (!sentProfileId || !receiveProfileId) {
        return res.status(404).json({ error: 'Profile not found' });
    }

    //if they aer the same, return error
    if (sentProfileId === receiveProfileId) {
        return res.status(400).json({ error: 'You cannot send a friend request to yourself' });
    }

    try {
        //check if the user is already friends with the profile and vice versa
        const friends = await prisma.friends.findMany({
            where: {
                OR: [
                    {
                        userId: sentProfileId,
                        friendId: receiveProfileId,
                    },
                    {
                        userId: receiveProfileId,
                        friendId: sentProfileId,
                    }
                ]
            }
        });

        if (friends.length > 0) {

            //check if the sentUser is the user that sent the request if it is and the friend request is pending, return error
            if (friends[0].userId === sentProfileId && friends[0].status === FriendRequestStatus.PENDING) {
                return res.status(400).json({ error: 'You have already sent a friend request to this user' });
            }

            //check if the sentUser is the user that received the request if it is and the friend request is pending, set status to accepted
            if (friends[0].userId === receiveProfileId && friends[0].status === FriendRequestStatus.PENDING) {
                await prisma.friends.update({
                    where: {
                        id: friends[0].id
                    },
                    data: {
                        status: FriendRequestStatus.ACCEPTED
                    }
                });
            }

            return res.status(400).json({ error: 'You are already friends with this user' });
        }

        await prisma.friends.create({
            data: {
                userId: sentProfileId,
                friendId: receiveProfileId,
            }
        });

        return res.status(200).json("Friend request sent!");
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }

};

export { sendFriendRequest };