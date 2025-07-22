const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const contacts = await Contact.find({ user_id: userId });
  res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    console.log("Incoming contact:", req.body);
    console.log("User making request:", req.user);

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const newContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });

    res.status(201).json(newContact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("update other user contacts not permission granted");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User does not have permission to delete other user contacts");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully", contact });
});

module.exports = {
    getContact,
    createContact,
    getContacts,
    updateContact,
    deleteContact,
};