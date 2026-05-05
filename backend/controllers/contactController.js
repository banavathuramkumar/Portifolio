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

module.exports = {
  createContact,
};
