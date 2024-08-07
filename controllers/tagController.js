const asyncHandler = require("express-async-handler");
const Tag = require("../models/Tag");

//@access private
const getTags = asyncHandler(async (req, res) => {
    const tags = await Tag.find();
    res.status(200).json(tags);
});

//@desc Create new tag
//@route POST /api/tags
//@access private
const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Tag name is required!");
    }
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
        return res.status(400).json({
            message: "Tag with this name already exists.",
        });
    }

    try {
        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        console.error("Error creating tag:", error);
        res.status(500).send("Error creating tag");
    }
});

//@desc Get tag by id
//@route GET /api/tags/:id
//@access private
const getTagByID = asyncHandler(async (req, res) => {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
        res.status(404);
        throw new Error("Tag not found");
    }
    res.status(200).json(tag);
});

//@desc Get tag by name
//@route GET /api/tags/:name
//@access private
const getTagByName = asyncHandler(async (req, res) => {
    const tag = await Tag.findById(req.params.name);
    if (!tag) {
        res.status(404);
        throw new Error("Tag not found");
    }
    res.status(200).json(tag);
});

//@desc Update tag
//@route PUT /api/tags/:id
//@access private
const updateTag = asyncHandler(async (req, res) => {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
        res.status(404);
        throw new Error("Tag not found");
    }
    const tagName = await Tag.findOne({ name: req.body.name });
    if (tagName) {
        return res.status(400).json({
            message: "Tag with this name already exists.",
        });
    }
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTag);
});

//@desc Delete tag
//@route DELETE /api/tags/:id
//@access private
const deleteTag = asyncHandler(async (req, res) => {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
        res.status(404);
        throw new Error("Tag not found");
    }
    try {
        await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        console.error("Error deleting tag:", error);
        res.status(500);
        throw new Error("Failed to delete the tag");
    }
});

module.exports = {
    getTags,
    createTag,
    getTagByID,
    getTagByName,
    updateTag,
    deleteTag,
};
