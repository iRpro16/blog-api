const postsService = require("../services/postsService");

async function postCreatePost(req, res) {
    try {
        const { heading, subheading, content, published } = req.body;
        const userId = req.user.id; // from previous middleware

        // handle if user is undefined
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User is undefined"});
        }
            
        await postsService.createPost(
            heading, 
            subheading,
            content,
            userId,
            published
        )
        res.status(201).json({ message: "Post created successfully" });

    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Post creation failed" });
    }
}

async function getBlogPost(req, res) {
    try {
        const { id }  = req.params;
        const post  = await postsService.showPost(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while fetching post" });
    }
}

async function deleteBlogPost(req, res) {
    try {
        const { id } = req.params;
        const deleted = await postsService.deletePost(id);

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!deleted) {
            return res.status(404).json({ message: "Post not found or already deleted" });
        }

        res.status(200).json({ message: "Post successfully deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while deleting post" });
    }
}

async function getAllBlogPosts(req, res) {
    try {
        const blogPosts = await postsService.showAllPosts();

        if (!blogPosts) {
            return res.status(404).json({ message: "Failed to fetch posts" });
        }

        res.status(200).json({ blogPosts });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error fetching all posts"});
    }
}

async function putBlogPost(req, res) {
    try {
        const { id } = req.params;
        const { heading, subheading, content, published } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // handle empty heading
        if (!heading || heading.trim() === "") {
            return res.status(400).json({ message: "Heading is required" });
        }

        const updated = await postsService.updatePost(id, heading, subheading, content, published);

        if (!updated) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while editing post" });
    }
}

module.exports = {
    postCreatePost,
    getBlogPost,
    deleteBlogPost,
    getAllBlogPosts,
    putBlogPost
}