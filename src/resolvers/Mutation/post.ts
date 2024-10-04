
export const postResolver = {
    addPost: async (parent: any, args: any, { prisma, userId }: any) => {
        const user = await prisma.user.findFirst({ where: { id: userId } });
        if (!user) {
            return {
                userError: "User not found",
                post: null,
            }
        }
        if (!args.title || !args.content) {
            return {
                userError: "Title or content is missing",
                post: null,
            }
        }
        const newPost = await prisma.post.create({
            data: {
                author: { connect: { id: user.id } },
                title: args.title,
                content: args.content,
            },
        });
        return {
            post: newPost,
            userError: null,
        };
    }
}