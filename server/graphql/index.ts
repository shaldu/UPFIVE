import { readFileSync } from "fs";
import path from "path";
import { userResolver } from "./resolvers/user.resolver";

const userTypeDefs = readFileSync(path.join(__dirname, "./typeDefs/user.graphql"), {
    encoding: "utf-8",
});

export const typeDefs = `
    ${userTypeDefs}
`;

export const resolvers = {
    Query: {
        ...userResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
    },
};