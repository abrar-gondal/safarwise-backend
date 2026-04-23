const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }
    const contact = await Contact.create({ name, email, phone, subject, message });
    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will reply within 24 hours.',
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { submitContact, getContacts };