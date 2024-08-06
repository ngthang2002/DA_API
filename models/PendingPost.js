const mongoose = require("mongoose");

const pendingPostSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        authorName: { type: String, required: true },
        authorAvatar: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        likeCount: { type: Number, default: 0 },
        commentsCount: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["public", "hidden", "pending"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PendingPost", pendingPostSchema);
