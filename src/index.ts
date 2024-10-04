import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';
import { jwtHelper } from './utils/jwtHelper';

interface IContext {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    userId: number | null;
}
const prisma = new PrismaClient();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({req}): Promise<IContext> => {
            const userId = await jwtHelper.getUserInfoFromToken(req.headers.authorization as string) as number;
            return {
                prisma,
                userId
            };
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer();