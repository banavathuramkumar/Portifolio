const Contact = require("../models/Contact");

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    if (contact) {
      res.status(201).json({
        message: "Message sent successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid contact data");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (admin only)
// @route   GET /admin/contacts
// @access  Private
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a contact message as read (admin only)
// @route   PUT /admin/contacts/:id/read
// @access  Private
const markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact message not found");
    }
    contact.read = req.body.read !== undefined ? req.body.read : true;
    await contact.save();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message (admin only)
// @route   DELETE /admin/contacts/:id
// @access  Private
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact message not found");
    }
    res.json({ message: "Message removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getContacts,
  markContactRead,
  deleteContact,
};
