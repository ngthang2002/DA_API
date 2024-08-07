const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const profilePictures = [
    "assets/avatarDefault/astronaut.png",
    "assets/avatarDefault/bear.png",
    "assets/avatarDefault/cat.png",
    "assets/avatarDefault/dog.png",
    "assets/avatarDefault/meerkat.png",
    "assets/avatarDefault/panda.png",
    "assets/avatarDefault/rabbit.png",
    "assets/avatarDefault/sea-lion.png",
    "assets/avatarDefault/tiger.png",
    "assets/avatarDefault/user.png",
];

const getRandomProfilePicture = () => {
    const randomIndex = Math.floor(Math.random() * profilePictures.length);
    return profilePictures[randomIndex];
};

//@desc Get all posts
//@route GET /api/posts
//@access private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("tags", "name");
    res.status(200).json(posts);
});

//@desc Create new post
//@route POST /api/posts
//@access private
const createPost = asyncHandler(async (req, res) => {
    const { title, description, content, tags } = req.body;
    if (!title || !description || !content || !tags) {
        res.status(400);
        throw new Error("Title, description, content and tags are required!");
    }
    const tag = await Post.findOne({
        title,
        description,
        authorId: req.user.id,
    });
    if (tag) {
        res.status(400);
        throw new Error("Post already exists!");
    }
    try {
        const post = await Post.create({
            title,
            description,
            content,
            image: `${process.env.IMAGE_BASE_URL}${getRandomProfilePicture()}`,
            tags,
            authorId: req.user.id,
            authorName: req.user.userName,
            authorAvatar: req.user.avatar,
        });
        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
});

//@desc Get post by id
//@route GET /api/posts/:id
//@access private
const getPostByID = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate("tags")
        .populate("authorId", "username avatar");
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    res.status(200).json(post);
});

//@desc Update post
//@route PUT /api/posts/:id
//@access private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User does not have permission to update this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .populate("tags")
        .populate("authorId", "username avatar");

    res.status(200).json(updatedPost);
});

//@desc Delete post
//@route DELETE /api/posts/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (
        post.authorId.toString() !== req.user._id.toString() ||
        req.user.roles !== "admin"
    ) {
        res.status(403);
        throw new Error("User does not have permission to delete this post");
    }

    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500);
        throw new Error("Failed to delete the post");
    }
});

module.exports = {
    getPosts,
    createPost,
    getPostByID,
    updatePost,
    deletePost,
};
