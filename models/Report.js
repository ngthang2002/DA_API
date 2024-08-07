const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
    {
        reporterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        targetType: {
            type: String,
            enum: ["Post", "Comment"],
            required: true,
        },
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "reviewed", "resolved"],
            default: "pending",
        },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Report", reportSchema);
