const prisma = require("../prisma/client");

async function createPost(heading, subheading, content, userId, published) {
    await prisma.post.create({
        data: {
            heading,
            subheading,
            content,
            userId,
            published
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
    const deletedPost = await prisma.post.delete({
        where: {
            id: postId,
        }
    });
    return deletedPost;
}

async function updatePost(postId, heading, subheading, content, published) {
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            heading,
            subheading,
            content,
            published,
            updatedAt: new Date(),
        }
    })
    return updatedPost;
}

module.exports = {
    createPost,
    showPost,
    showAllPosts,
    deletePost,
    updatePost
}