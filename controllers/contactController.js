const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    console.log("The user id is :", req.user.id);
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    // console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const existingContact = await Contact.findOne(
        {
            user_id: req.user.id,
        },
        "_id"
    );
    if (existingContact) {
        return res.status(400).json({
            message:
                "Contact with this email or phone already exists for this user.",
        });
    }

    try {
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id,
        });
        console.log("The contact is :", contact);
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).send("Error creating contact");
    }
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("User unauthorized for this operation");
    }

    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(
            "User don't have permission to update other user contacts"
        );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    console.log("The user id is :", req.user.id);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() == req.user.id) {
        res.status(403);
        throw new Error(
            "User don't have permission to update other user contacts"
        );
    }
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500);
        throw new Error("Failed to delete the contact");
    }
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
