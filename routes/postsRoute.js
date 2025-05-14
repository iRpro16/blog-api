const { Router } = require("express");
const postsRotuer =  Router();
const postsController = require("../controllers/postsController");
const verifyToken = require("../middleware/verifyToken");

// GET method to fetch all posts
postsRotuer.get("/api/posts", postsController.getAllBlogPosts);
// POST method to create post
postsRotuer.post("/api/posts", verifyToken, postsController.postCreatePost);

// GET method to load post
postsRotuer.get("/api/posts/:id", postsController.getBlogPost);

// DELETE method to delete post
postsRotuer.delete("/api/posts/:id", postsController.deleteBlogPost);

module.exports = postsRotuer;