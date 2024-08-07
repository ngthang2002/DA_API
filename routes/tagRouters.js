const express = require("express");
const router = express.Router();
const {
    getTags,
    createTag,
    getTagByID,
    getTagByName,
    updateTag,
    deleteTag,
} = require("../controllers/tagController");
const validateToken = require("../middleware/validateTokenHandler");
const verifyRoles = require("../middleware/verifyRolesHandler");

router.use(validateToken);

router.route("/").get(getTags).post(verifyRoles("admin"), createTag);
router
    .route("/:id")
    .get(getTagByID)
    .put(verifyRoles("admin"), updateTag)
    .delete(verifyRoles("admin"), deleteTag);
router.route("/:name").get(getTagByName);

module.exports = router;
