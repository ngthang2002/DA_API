const asyncHandler = require("express-async-handler");

const verifyRoles = (allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req?.user.roles)
            return res.status(401).json({ message: "UnauthorizedUser" });
        if (req.user.roles !== "admin")
            return res.status(401).json({ message: "UnauthorizedUser" });
        next();
    });
};

module.exports = verifyRoles;
