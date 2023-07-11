import { FriendRequestStatus, PrismaClient, Privacy } from '@prisma/client';
import { Request, Response } from "express";

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

const getAllFriends = async (req: Request, res: Response) => {
    const { profileId } = req.params;

    if (!await isRequestedProfileIdSameAsSessionProfileId(profileId, req.headers['sessionid'] as string)) {
        return res.status(403).json("Forbidden");
    }


    try {
        const friends = await prisma.friends.findMany({
            where: {
                OR: [
                    {
                        userId: profileId
                    },
                    {
                        friendId: profileId
                    }
                ]
            },
            include: {
                user: true,
                friend: true
            },
        });

        return res.status(200).json( friends.map((d) => ({...d, user: {...d.user, updatedAt: undefined, id: undefined}, friend: {...d.friend, updatedAt: undefined, id:undefined}})));
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

async function isRequestedProfileIdSameAsSessionProfileId(profileId: string, sessionId: string) {
    //get profile from session
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
            user: true,
        }
    });

    if (session === null) {
        return false;
    }

    const sessionProfileId = session.user.profileId;

    if (profileId === sessionProfileId) {
        return true;
    }
}

export { sendFriendRequest, getAllFriends };