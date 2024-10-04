import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';

interface IContext {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}
const prisma = new PrismaClient();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async (): Promise<IContext> => {
            return {
                prisma
            };
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer();