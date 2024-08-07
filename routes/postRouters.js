const express = require("express");
const router = express.Router();
const {
    getPosts,
    createPost,
    getPostByID,
    updatePost,
    deletePost,
} = require("../controllers/postController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getPosts);
router.route("/:id").get(getPostByID);

router.use(validateToken);
router.route("/").post(createPost);
router.route("/:id").put(updatePost).delete(deletePost);

module.exports = router;
