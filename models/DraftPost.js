const mongoose = require("mongoose");

const draftPostSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }, // Trường mô tả
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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("DraftPost", draftPostSchema);
