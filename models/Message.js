const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        messageIndex: { type: Number, required: true },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        createdAt: { type: Date, default: Date.now },
    },
    { _id: false } // We don't need individual _id for messages
);

const messageThreadSchema = mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        messagesCount: { type: Number, default: 0 },
        messages: [messageSchema],
        pageCurrent: { type: Number, default: 1 },
        pageTotal: { type: Number, default: 1 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageThreadSchema);
