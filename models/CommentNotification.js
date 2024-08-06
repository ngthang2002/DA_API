const mongoose = require("mongoose");

const commentNotificationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        postTitle: { type: String, required: true },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        replyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReplyComment",
        },
        type: {
            type: String,
            enum: ["new_comment", "new_reply"],
            default: "new_comment",
        },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "CommentNotification",
    commentNotificationSchema
);
