import {GraphQLResolveInfo} from 'graphql';
import {createUser, getUsers, getUser} from '../services/user.service';

export const userResolver = {
    Query: {
        async users(_: any, args: any, context: any, info: GraphQLResolveInfo) {
            return await getUsers({info});
        },

        async user(_: any, args: any, context: any, info: GraphQLResolveInfo) {
            return await getUser({id: args.id, info});
        },
    },
    Mutation: {
        async createUser(_: any, {input}: Record<string,any>) {
            return await createUser({email: input.email, username: input.username});
        },
        async updateUser() {},
        async deleteUser() {},
    }
};