const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        commentsCount: { type: Number, default: 0 },
        comments: [
            {
                commentIndex: { type: Number, required: true },
                authorId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                authorName: { type: String, required: true },
                authorAvatar: { type: String },
                content: { type: String, required: true },
                likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
                likeCount: { type: Number, default: 0 },
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now },
            },
        ],
        pageCurrent: { type: Number, required: true },
        pageTotal: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", commentSchema);
