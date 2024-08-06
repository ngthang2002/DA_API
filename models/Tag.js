const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [2, "Tag name must be at least 2 characters long"],
            maxlength: [50, "Tag name must be less than 50 characters long"],
        },
        postCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tag", tagSchema);
