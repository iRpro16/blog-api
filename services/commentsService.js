const primsa = require("../prisma/client");

async function createComment(content, postId, userId) {
    await primsa.comment.create({
        data: {
            content,
            postId,
            userId
        }
    })
}

async function deleteComment(commentId) {
    const deletedComment = await primsa.comment.delete({
        where: {
            id: commentId,
        }
    });
    return deletedComment;
}

async function updateComment(commentId, content) {
    const updatedComment = await primsa.comment.update({
        where: {
            id: commentId,
        },
        data: {
            content,
        }
    });
    return updatedComment;
}

module.exports = {
    createComment,
    deleteComment,
    updateComment
}