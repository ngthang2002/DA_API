const mongoose = require("mongoose");

const postNotificationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        postTitle: { type: String, required: true },
        type: {
            type: String,
            enum: ["new_post"],
            default: "new_post",
        },
        details: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PostNotification", postNotificationSchema);
