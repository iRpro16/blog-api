const { Router } = require("express");
const postsRouter =  Router();
const postsController = require("../controllers/postsController");
const verifyToken = require("../middleware/verifyToken");

// GET method to fetch all posts
postsRouter.get("/api/posts", postsController.getAllBlogPosts);

// POST method to create post
postsRouter.post("/api/posts", verifyToken, postsController.postCreatePost);

// GET method to load post
postsRouter.get("/api/posts/:id", postsController.getBlogPost);

// DELETE method to delete post
postsRouter.delete("/api/posts/:id", verifyToken, postsController.deleteBlogPost);

// PUT method to update post
postsRouter.put("/api/posts/:id", verifyToken, postsController.putBlogPost);

module.exports = postsRouter;