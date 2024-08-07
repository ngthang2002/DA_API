const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// const createFakeData = require("./post.js");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

// createFakeData();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRouters"));
app.use("/api/tags", require("./routes/tagRouters"));
app.use("/api/posts", require("./routes/postRouters"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
