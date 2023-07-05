import {PrismaClient} from '@prisma/client';
import {extractSelection} from '../utils/extractSelections';
import {GraphQLResolveInfo} from 'graphql';

interface GetUsersArgs {
    info: GraphQLResolveInfo;
}
interface GetUserArgs {
    id: string,
    info: GraphQLResolveInfo;
}
interface UserInput {
    email: string,
    password: string,
    username?: string
}

const prisma = new PrismaClient();

export const getUsers = async ({info}: GetUsersArgs) => {
    //use info to get the fields that are requested
    const extractedSelections = extractSelection(info);
    return await prisma.user.findMany();

};

export const getUser = async ({id, info}: GetUserArgs) => {
    //use info to get the fields that are requested
    const extractedSelections = extractSelection(info);
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
}

export const createUser = async ({email, password, username}: UserInput) => {
    const createdUser = await prisma.user.create({data: {
        email,
        password,
        username
    }});

    return createdUser;
}