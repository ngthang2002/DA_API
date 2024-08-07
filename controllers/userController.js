const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

// Helper function to get a random profile picture
const getRandomProfilePicture = () => {
    const randomIndex = Math.floor(Math.random() * profilePictures.length);
    return profilePictures[randomIndex];
};

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, fullName } = req.body;
    if (!userName || !email || !password || !fullName) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }
    const salt = bcrypt.genSaltSync(6);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({
            userName,
            email,
            hashedPassword,
            fullName,
            salt,
            resetPasswordExpires: Date.now() + 3600000,
            roles: "user",
            avatar: `${process.env.IMAGE_BASE_URL}${getRandomProfilePicture()}`,
        });
        res.status(201).json({ _id: user.id, email: user.email });
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ errors: error.errors.email.message });
        } else if (error.code === 11000) {
            res.status(400).json({ error: "Email address already taken" });
        } else {
            res.status(500);
            throw new Error("Server Error");
        }
    }

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    console.log("Email: ", email);
    const user = await User.findOne({ email });
    // Compare password with hashedPassword
    const hashedInputPassword = await bcrypt.hash(password, user.salt);
    console.log("Hashed Password: " + user.salt);
    if (hashedInputPassword === user.hashedPassword) {
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    roles: user.roles,
                    userName: user.userName,
                    avatar: user.avatar,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60d" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
