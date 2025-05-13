const prisma = require("../prisma/client");

async function createPost(heading, subheading, content, userId, published) {
    await prisma.post.create({
        data: {
            heading: heading,
            subheading: subheading,
            content: content,
            userId: userId,
            published: published
        }  
    })
}

async function showPost(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            comments: true,
        }
    })
    return post;
}

async function showAllPosts() {
    const allPosts = await prisma.post.findMany();
    return allPosts;
}

async function deletePost(postId) {
    await prisma.post.delete({
        where: {
            id: postId,
        }
    })
}

module.exports = {
    createPost,
    showPost,
    showAllPosts,
    deletePost
}