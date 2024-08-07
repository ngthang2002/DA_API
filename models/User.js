const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: "Email already exists",
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
            required: "Email is required",
        },
        hashedPassword: {
            type: String,
            required: "Password is required",
        },
        salt: { type: String },
        fullName: { type: String, required: true },
        dateOfBirth: { type: Date },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        avatar: { type: String },
        roles: { type: String, required: true },
        postCount: { type: Number, default: 0 },
        followersCount: { type: Number, default: 0 },
        followingCount: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        phone: {
            type: String,
            trim: true,
            match: [/^\d{10}$/, "Please fill a valid phone number"],
        },
        address: {
            city: { type: String },
            country: { type: String },
        },
        bio: { type: String, trim: true },
        restrictions: [
            {
                type: { type: String },
                reason: { type: String },
                startDate: { type: Date },
                endDate: { type: Date },
            },
        ],
        socialLinks: {
            youtube: { type: String },
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String },
        },
        resetPasswordExpires: { type: Date },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
